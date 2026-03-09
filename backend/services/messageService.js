import { sanitize } from '../utils/sanitizer.js';
import { dynamoService } from './dynamoService.js';
import { socketAsyncHandler } from '../utils/asyncHandler.js';
import { CustomError } from '../utils/ErrorResponse.js';
import { validateWithSchema } from '../utils/validator.js';
import { messageSchema, reactionSchema } from '../validators/messageValidator.js';

export const handleChatMessage = socketAsyncHandler(async (io, socket, data) => {
    // VALIDATION moved here
    const validation = validateWithSchema(messageSchema, data);
    if (!validation.success) {
        throw new CustomError('Invalid message data', 400, { details: validation.fieldErrors });
    }

    const { room, username, message, timestamp, replyTo } = validation.data;

    if (!room || !message) {
        throw new CustomError('Room and message are required', 400);
    }

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
});

export const handleTyping = socketAsyncHandler(async (io, socket, data) => {
    if (!data.room) return;
    await dynamoService.broadcastToRoom(io, data.room, 'typing', data);
});

export const handleAddReaction = socketAsyncHandler(async (io, socket, data) => {
    const { room, messageId, emoji, username } = data;

    const validation = validateWithSchema(reactionSchema, data);
    if (!validation.success) {
        throw new CustomError('Reaction validation failed', 400, { details: validation.fieldErrors });
    }

    const { room: r, messageId: mid, emoji: e, username: un } = validation.data;

    const reactionData = {
        messageId: mid,
        emoji: e,
        username: un,
        timestamp: new Date().toISOString()
    };

    await dynamoService.broadcastToRoom(io, r, 'reaction_added', reactionData);
});

export const handleRemoveReaction = socketAsyncHandler(async (io, socket, data) => {
    const { room, messageId, emoji, username } = data;

    const validation = validateWithSchema(reactionSchema, data);
    if (!validation.success) {
        throw new CustomError('Reaction removal validation failed', 400, { details: validation.fieldErrors });
    }

    const { room: r, messageId: mid, emoji: e, username: un } = validation.data;
    const removeData = { messageId: mid, emoji: e, username: un };

    await dynamoService.broadcastToRoom(io, r, 'reaction_removed', removeData);
});
