import { handleJoinRoom } from '../../services/roomService.js';

export default (io, socket) => {
    // Handle user joining a room
    socket.on('join_room', async (data) => {
        // service handles validation and error emitting via socketAsyncHandler
        await handleJoinRoom(io, socket, data);
    });
};
