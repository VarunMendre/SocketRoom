import { dynamoService } from './dynamoService.js';
import { socketAsyncHandler } from '../utils/asyncHandler.js';
import { CustomError } from '../utils/ErrorResponse.js';
import { validateWithSchema } from '../utils/validator.js';
import { joinRoomSchema } from '../validators/roomValidator.js';

export const handleJoinRoom = socketAsyncHandler(async (io, socket, data) => {
    const processedData = typeof data === 'string' ? { roomId: data, username: 'Anonymous' } : data;
    
    const validation = validateWithSchema(joinRoomSchema, processedData);
    if (!validation.success) {
        throw new CustomError('Validation failed', 400, { details: validation.fieldErrors });
    }

    const { roomId, username } = validation.data;

    socket.join(roomId);

    await dynamoService.saveConnection(socket.id, username, roomId);

    const joinData = {
        username,
        timestamp: new Date().toISOString()
    };
    await dynamoService.broadcastToRoom(io, roomId, 'user_joined', joinData);

    const members = await dynamoService.getRoomMembers(roomId);
    const usersInRoom = members.map(m => m.username);
    await dynamoService.broadcastToRoom(io, roomId, 'users_update', usersInRoom);
});

export const handleLeaveRoom = socketAsyncHandler(async (io, socket, data) => {
    const { roomId, username } = data;
    
    if (!roomId) {
        throw new CustomError('Room ID is required to leave', 400);
    }

    socket.leave(roomId);

    await dynamoService.removeConnection(socket.id);

    await dynamoService.broadcastToRoom(io, roomId, 'user_left', {
        username,
        timestamp: new Date().toISOString()
    });

    const members = await dynamoService.getRoomMembers(roomId);
    const usersInRoom = members.map(m => m.username);
    await dynamoService.broadcastToRoom(io, roomId, 'users_update', usersInRoom);
});

export const handleDisconnect = socketAsyncHandler(async (io, socket) => {
    const userData = await dynamoService.getConnection(socket.id);
    if (userData) {
        const { username, roomId } = userData;
        await dynamoService.removeConnection(socket.id);

        await dynamoService.broadcastToRoom(io, roomId, 'user_left', {
            username,
            timestamp: new Date().toISOString()
        });

        const members = await dynamoService.getRoomMembers(roomId);
        const usersInRoom = members.map(m => m.username);
        await dynamoService.broadcastToRoom(io, roomId, 'users_update', usersInRoom);
    }
});
