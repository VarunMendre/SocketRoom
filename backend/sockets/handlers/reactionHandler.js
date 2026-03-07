import { handleAddReaction, handleRemoveReaction } from '../../services/messageService.js';
import { validateWithSchema } from '../../utils/validator.js';
import { reactionSchema } from '../../validators/messageValidator.js';

export default (io, socket) => {
    // Handle message reactions
    socket.on('add_reaction', (data) => {
        const validation = validateWithSchema(reactionSchema, data);
        if (!validation.success) {
            console.error('❌ Reaction validation failed:', validation.fieldErrors);
            return;
        }
        handleAddReaction(io, socket, validation.data);
    });

    // Handle removing reactions
    socket.on('remove_reaction', (data) => {
        const validation = validateWithSchema(reactionSchema, data);
        if (!validation.success) {
            console.error('❌ Reaction removal validation failed:', validation.fieldErrors);
            return;
        }
        handleRemoveReaction(io, socket, validation.data);
    });
};
