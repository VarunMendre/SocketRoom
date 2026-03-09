import { handleAddReaction, handleRemoveReaction } from '../../services/messageService.js';

export default (io, socket) => {
    // Handle message reactions
    socket.on('add_reaction', async (data) => {
        // Validation and CustomError wrapping handled in the service
        await handleAddReaction(io, socket, data);
    });

    // Handle removing reactions
    socket.on('remove_reaction', async (data) => {
        // Validation and CustomError wrapping handled in the service
        await handleRemoveReaction(io, socket, data);
    });
};
