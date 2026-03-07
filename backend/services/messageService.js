import { sanitize } from '../utils/sanitizer.js';

export const handleChatMessage = (io, socket, data) => {
    console.log('Message received:', data);

    const sanitizedMessage = sanitize(data.message);

    // Broadcast to everyone in the room INCLUDING the sender
    io.to(data.room).emit('chat message', {
        id: `${Date.now()}-${Math.random()}`, // Unique message ID
        username: data.username,
        message: sanitizedMessage,
        timestamp: data.timestamp,
        replyTo: data.replyTo || null,
        reactions: {}
    });
};

export const handleTyping = (io, socket, data) => {
    socket.to(data.room).emit('typing', data);
};

export const handleAddReaction = (io, socket, data) => {
    const { room, messageId, emoji, username } = data;
    console.log(`Reaction added: ${emoji} by ${username} on message ${messageId}`);

    // Broadcast reaction to everyone in the room
    io.to(room).emit('reaction_added', {
        messageId,
        emoji,
        username,
        timestamp: new Date().toISOString()
    });
};

export const handleRemoveReaction = (io, socket, data) => {
    const { room, messageId, emoji, username } = data;
    console.log(`Reaction removed: ${emoji} by ${username} on message ${messageId}`);

    // Broadcast reaction removal to everyone in the room
    io.to(room).emit('reaction_removed', {
        messageId,
        emoji,
        username
    });
};
