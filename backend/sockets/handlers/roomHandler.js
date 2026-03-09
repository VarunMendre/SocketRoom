import { handleJoinRoom } from '../../services/roomService.js';
import { validateWithSchema } from '../../utils/validator.js';
import { joinRoomSchema } from '../../validators/roomValidator.js';

export default (io, socket) => {
    // Handle user joining a room
    socket.on('join_room', async (data) => {
        const processedData = typeof data === 'string' ? { roomId: data, username: 'Anonymous' } : data;
        
        const validation = validateWithSchema(joinRoomSchema, processedData);
        if (!validation.success) {
            console.error('❌ Room join validation failed:', validation.fieldErrors);
            return socket.emit('error_message', { error: 'Invalid room or username' });
        }

        await handleJoinRoom(io, socket, validation.data);
    });
};
