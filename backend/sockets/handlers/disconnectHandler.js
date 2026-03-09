import { handleDisconnect, handleLeaveRoom } from '../../services/roomService.js';

export default (io, socket) => {
    // Handle user disconnect (Browser closed, etc.)
    socket.on('disconnect', async () => {
        await handleDisconnect(io, socket);
    });

    // Handle explicit leave room action
    socket.on('leave_room', async (data) => {
        if (!data || !data.roomId || !data.username) {
            console.error('❌ Missing data for leave_room event');
            return;
        }
        await handleLeaveRoom(io, socket, data);
    });
};
 