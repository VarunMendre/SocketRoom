import { activeRooms, userSockets } from '../store/userStore.js';

export const handleJoinRoom = (io, socket, data) => {
    console.log('📥 Join room data received:', data);

    // Handle both {roomId, username} and just roomId string
    const roomId = typeof data === 'string' ? data : data.roomId;
    const username = typeof data === 'string' ? 'Anonymous' : data.username;

    if (!roomId || !username) {
        console.error('❌ Missing roomId or username:', data);
        return;
    }

    socket.join(roomId);

    // Store user info
    userSockets.set(socket.id, { username, roomId });

    // Add user to room
    if (!activeRooms.has(roomId)) {
        activeRooms.set(roomId, new Set());
    }

    // Remove user first if they already exist (prevents duplicates)
    activeRooms.get(roomId).delete(username);
    // Now add them
    activeRooms.get(roomId).add(username);

    console.log(`✅ User ${username} (${socket.id}) joined room: ${roomId}`);
    console.log(`👥 Users in room:`, Array.from(activeRooms.get(roomId)));

    // Notify others in the room that a user joined
    socket.to(roomId).emit('user_joined', {
        username,
        timestamp: new Date().toISOString()
    });

    // Send updated user list to everyone in the room
    const usersInRoom = Array.from(activeRooms.get(roomId));
    io.to(roomId).emit('users_update', usersInRoom);
};

export const handleLeaveRoom = (io, socket, data) => {
    const { roomId, username } = data;

    socket.leave(roomId);

    if (activeRooms.has(roomId)) {
        activeRooms.get(roomId).delete(username);

        if (activeRooms.get(roomId).size === 0) {
            activeRooms.delete(roomId);
        } else {
            // Notify others
            socket.to(roomId).emit('user_left', {
                username,
                timestamp: new Date().toISOString()
            });

            // Send updated user list
            const usersInRoom = Array.from(activeRooms.get(roomId));
            io.to(roomId).emit('users_update', usersInRoom);
        }
    }

    userSockets.delete(socket.id);
    console.log(`User ${username} explicitly left room: ${roomId}`);
};

export const handleDisconnect = (io, socket) => {
    const userData = userSockets.get(socket.id);

    if (userData) {
        const { username, roomId } = userData;
        console.log(`❌ User ${username} (${socket.id}) disconnected from room: ${roomId}`);

        // Remove user from room
        if (activeRooms.has(roomId)) {
            activeRooms.get(roomId).delete(username);

            console.log(`👥 Remaining users in room ${roomId}:`, Array.from(activeRooms.get(roomId)));

            // If room is empty, remove it
            if (activeRooms.get(roomId).size === 0) {
                activeRooms.delete(roomId);
                console.log(`🗑️ Room ${roomId} deleted (empty)`);
            } else {
                // Notify others that user left
                socket.to(roomId).emit('user_left', {
                    username,
                    timestamp: new Date().toISOString()
                });

                // Send updated user list
                const usersInRoom = Array.from(activeRooms.get(roomId));
                io.to(roomId).emit('users_update', usersInRoom);
            }
        }

        userSockets.delete(socket.id);
    } else {
        console.log('❌ User disconnected (no data found):', socket.id);
    }
};
