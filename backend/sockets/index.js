import registerRoomHandlers from './handlers/roomHandler.js';
import registerMessageHandlers from './handlers/messageHandler.js';
import registerReactionHandlers from './handlers/reactionHandler.js';
import registerDisconnectHandlers from './handlers/disconnectHandler.js';

const initSockets = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Register all handlers
        registerRoomHandlers(io, socket);
        registerMessageHandlers(io, socket);
        registerReactionHandlers(io, socket);
        registerDisconnectHandlers(io, socket);
    });
};

export default initSockets;
