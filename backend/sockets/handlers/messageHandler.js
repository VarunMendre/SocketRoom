import { handleChatMessage, handleTyping } from '../../services/messageService.js';

export default (io, socket) => {
    // Handle chat messages
    socket.on('chat message', async (data) => {
        // service handles validation and error emitting via socketAsyncHandler
        await handleChatMessage(io, socket, data);
    });

    // Handle typing indicator
    socket.on('typing', async (data) => {
        if (!data.room) return;
        await handleTyping(io, socket, data);
    });
};
