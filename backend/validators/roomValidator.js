import z from 'zod';

export const joinRoomSchema = z.object({
  roomId: z.string().min(1, 'Room ID is required'),
  username: z.string().min(1, 'Username is required').max(20, 'Username too long'),
});
