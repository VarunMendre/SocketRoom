import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { 
  DynamoDBDocumentClient, 
  GetCommand,
  PutCommand, 
  DeleteCommand, 
  QueryCommand
} from "@aws-sdk/lib-dynamodb";
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi";

// --- Configuration ---
const isLocal = process.env.NODE_ENV !== 'production' && !process.env.AWS_LAMBDA_FUNCTION_NAME;
const TABLE_NAME = process.env.CHAT_TABLE || "ChatConnections";

// AWS Client setup
const client = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(client);

// API Gateway Management Client (For Lambda broadcasting)
// This is normally initialized with the callback URL from the request domain
let apiGwClient = null;

const getApiGwClient = (endpoint) => {
    if (!apiGwClient && endpoint) {
        apiGwClient = new ApiGatewayManagementApiClient({
            region: process.env.AWS_REGION || "us-east-1",
            endpoint: endpoint
        });
    }
    return apiGwClient;
};

// --- Local Mock Store (For local testing) ---
const localStore = new Map();

export const dynamoService = {
  /**
   * Save user connection with 30 min TTL
   */
  saveConnection: async (connectionId, username, roomId) => {
    if (isLocal) {
      localStore.set(connectionId, { username, roomId });
      return;
    }

    const params = {
      TableName: TABLE_NAME,
      Item: {
        connectionId,
        username,
        roomId,
        ttl: Math.floor(Date.now() / 1000) + 1800 // 30 min TTL
      },
    };
    await ddbDocClient.send(new PutCommand(params));
  },

  removeConnection: async (connectionId) => {
    if (isLocal) {
      localStore.delete(connectionId);
      return;
    }

    const params = {
      TableName: TABLE_NAME,
      Key: { connectionId },
    };
    await ddbDocClient.send(new DeleteCommand(params));
  },

  getConnection: async (connectionId) => {
    if (isLocal) {
      return localStore.get(connectionId);
    }

    const params = {
      TableName: TABLE_NAME,
      Key: { connectionId },
    };
    const { Item } = await ddbDocClient.send(new GetCommand(params));
    return Item;
  },

  getRoomMembers: async (roomId) => {
    if (isLocal) {
      return Array.from(localStore.entries())
        .filter(([_, data]) => data.roomId === roomId)
        .map(([id, data]) => ({ connectionId: id, ...data }));
    }

    const params = {
      TableName: TABLE_NAME,
      IndexName: "RoomIndex", 
      KeyConditionExpression: "roomId = :r",
      ExpressionAttributeValues: { ":r": roomId },
    };
    const { Items } = await ddbDocClient.send(new QueryCommand(params));
    return Items || [];
  },

  /**
   * Universal Broadcast helper for Serverless
   */
  broadcastToRoom: async (io, roomId, event, data, endpoint = null) => {
    const members = await dynamoService.getRoomMembers(roomId);
    
    if (isLocal) {
        // In local dev, we can still use Socket.io's built-in room broadcasting
        io.to(roomId).emit(event, data);
        return;
    }

    // In Serverless, we must manually push to each connection via AWS API Gateway
    const client = getApiGwClient(endpoint);
    if (!client) return;

    const postCalls = members.map(async (member) => {
        try {
            await client.send(new PostToConnectionCommand({
                ConnectionId: member.connectionId,
                Data: JSON.stringify({ event, data })
            }));
        } catch (err) {
            if (err.name === 'GoneException' || err.statusCode === 410) {
                // Connection is dead, cleanup
                await dynamoService.removeConnection(member.connectionId);
            }
        }
    });

    await Promise.all(postCalls);
  }
};