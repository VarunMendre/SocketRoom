import { sanitize } from '../utils/sanitizer.js';
import { dynamoService } from './dynamoService.js';

export const handleChatMessage = async (io, socket, data) => {
    try {
        console.log('Message received:', data);
        const { room, username, message, timestamp, replyTo } = data;

        if (!room || !message) return;

        const sanitizedMessage = sanitize(message);

        const messageData = {
            id: `${Date.now()}-${Math.random()}`,
            username: username || 'Anonymous',
            message: sanitizedMessage,
            timestamp: timestamp || new Date().toISOString(),
            replyTo: replyTo || null,
            reactions: {}
        };

        // Serverless-aware broadcasting
        await dynamoService.broadcastToRoom(io, room, 'chat message', messageData);
        
    } catch (err) {
        console.error('❌ Error in handleChatMessage:', err);
        socket.emit('error_message', { error: 'Failed to send message' });
    }
};

export const handleTyping = async (io, socket, data) => {
    try {
        if (!data.room) return;
        // Optimization: For typing, standard emit is fine since it's transient
        // but for full Serverless compatibility, we still use the helper
        await dynamoService.broadcastToRoom(io, data.room, 'typing', data);
    } catch (err) {
        // Silently fail for typing indicators to avoid noise
    }
};

export const handleAddReaction = async (io, socket, data) => {
    try {
        const { room, messageId, emoji, username } = data;
        const reactionData = {
            messageId,
            emoji,
            username,
            timestamp: new Date().toISOString()
        };

        await dynamoService.broadcastToRoom(io, room, 'reaction_added', reactionData);
    } catch (err) {
        console.error('❌ Error in handleAddReaction:', err);
    }
};

export const handleRemoveReaction = async (io, socket, data) => {
    try {
        const { room, messageId, emoji, username } = data;
        const removeData = { messageId, emoji, username };

        await dynamoService.broadcastToRoom(io, room, 'reaction_removed', removeData);
    } catch (err) {
        console.error('❌ Error in handleRemoveReaction:', err);
    }
};
