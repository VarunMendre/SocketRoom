import { handleChatMessage, handleTyping } from '../../services/messageService.js';
import { validateWithSchema } from '../../utils/validator.js';
import { messageSchema } from '../../validators/messageValidator.js';

export default (io, socket) => {
    // Handle chat messages
    socket.on('chat message', async (data) => {
        const validation = validateWithSchema(messageSchema, data);
        if (!validation.success) {
            console.error('❌ Message validation failed:', validation.fieldErrors);
            return socket.emit('error_message', { error: 'Invalid message data' });
        }

        await handleChatMessage(io, socket, validation.data);
    });

    // Handle typing indicator
    socket.on('typing', async (data) => {
        if (!data.room) return;
        await handleTyping(io, socket, data);
    });
};
