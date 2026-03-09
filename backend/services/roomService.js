import { dynamoService } from './dynamoService.js';
import { errorResponse } from '../utils/successResponse.js';

export const handleJoinRoom = async (io, socket, data) => {
    try {
        console.log('📥 Join room data received:', data);

        const roomId = typeof data === 'string' ? data : data.roomId;
        const username = typeof data === 'string' ? 'Anonymous' : data.username;

        if (!roomId || !username || username === 'Anonymous') {
            return socket.emit('error_message', { error: 'Valid username and Room ID are required' });
        }

        socket.join(roomId);

        await dynamoService.saveConnection(socket.id, username, roomId);
        console.log(`✅ User ${username} (${socket.id}) joined room: ${roomId}`);

        // Broadcast join notification
        const joinData = {
            username,
            timestamp: new Date().toISOString()
        };
        await dynamoService.broadcastToRoom(io, roomId, 'user_joined', joinData);

        // Broadcast updated user list
        const members = await dynamoService.getRoomMembers(roomId);
        const usersInRoom = members.map(m => m.username);
        await dynamoService.broadcastToRoom(io, roomId, 'users_update', usersInRoom);

    } catch (err) {
        console.error('❌ Error in handleJoinRoom:', err);
        socket.emit('error_message', { error: 'Failed to join room' });
    }
};

export const handleLeaveRoom = async (io, socket, data) => {
    try {
        const { roomId, username } = data;
        socket.leave(roomId);

        await dynamoService.removeConnection(socket.id);

        await dynamoService.broadcastToRoom(io, roomId, 'user_left', {
            username,
            timestamp: new Date().toISOString()
        });

        const members = await dynamoService.getRoomMembers(roomId);
        const usersInRoom = members.map(m => m.username);
        await dynamoService.broadcastToRoom(io, roomId, 'users_update', usersInRoom);

        console.log(`User ${username} explicitly left room: ${roomId}`);
    } catch (err) {
        console.error('❌ Error in handleLeaveRoom:', err);
    }
};

export const handleDisconnect = async (io, socket) => {
    try {
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
    } catch (err) {
        console.error('❌ Error in handleDisconnect:', err);
    }
};
