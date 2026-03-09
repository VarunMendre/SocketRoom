import serverless from 'serverless-http';
import { handleJoinRoom, handleLeaveRoom, handleDisconnect } from './services/roomService.js';
import { handleChatMessage, handleTyping, handleAddReaction, handleRemoveReaction } from './services/messageService.js';
import server from './server.js'; // Import your express app

// 1. HTTP Handler (Health Check)
// We wrap your Express app to handle HTTP requests via Lambda
export const httpHandler = serverless(server);

// 2. WebSocket Handler
// Handles the binary-like events for AWS API Gateway WebSockets
export const wsHandler = async (event) => {
    const { routeKey, connectionId, body } = event.requestContext;
    const domain = event.requestContext.domainName;
    const stage = event.requestContext.stage;
    const endpoint = `https://${domain}/${stage}`; // This is the gateway to reply back

    // Mock Socket and IO objects for your services to consume
    const mockIo = {
        endpoint: endpoint,
        to: (room) => ({
            emit: (ev, data) => {} 
        })
    };

    const mockSocket = {
        id: connectionId,
        endpoint: endpoint,
        join: () => {}, 
        leave: () => {},
        emit: (ev, data) => {}, 
        to: (room) => ({
            emit: (ev, data) => {} 
        })
    };

    try {
        switch (routeKey) {
            case '$connect':
                console.log(`[WS] Connected: ${connectionId}`);
                return { statusCode: 200, body: 'Connected' };

            case '$disconnect':
                console.log(`[WS] Disconnected: ${connectionId}`);
                await handleDisconnect(mockIo, mockSocket);
                return { statusCode: 200, body: 'Disconnected' };

            case '$default':
                // Message-style event (Raw JSON from frontend)
                const payload = JSON.parse(event.body || '{}');
                const action = payload.action; // $default uses an 'action' key usually

                // MAPPING back to your socket events:
                if (action === 'join_room') await handleJoinRoom(mockIo, mockSocket, payload.data);
                if (action === 'chat message') await handleChatMessage(mockIo, mockSocket, payload.data);
                if (action === 'leave_room') await handleLeaveRoom(mockIo, mockSocket, payload.data);
                if (action === 'typing') await handleTyping(mockIo, mockSocket, payload.data);
                if (action === 'add_reaction') await handleAddReaction(mockIo, mockSocket, payload.data);
                if (action === 'remove_reaction') await handleRemoveReaction(mockIo, mockSocket, payload.data);

                return { statusCode: 200, body: 'OK' };

            default:
                return { statusCode: 200, body: 'OK' };
        }
    } catch (err) {
        console.error('[Lambda WebSocket Error]', err);
        return { statusCode: 500, body: err.message };
    }
};
