import z from 'zod';

export const messageSchema = z.object({
  room: z.string().min(1, 'Room is required'),
  username: z.string().min(1, 'Username is required'),
  message: z.string().min(1, 'Message cannot be empty'),
  timestamp: z.string().optional(),
  replyTo: z.any().optional(),
});

export const reactionSchema = z.object({
  room: z.string().min(1, 'Room is required'),
  messageId: z.string().min(1, 'Message ID is required'),
  emoji: z.string().min(1, 'Emoji is required'),
  username: z.string().min(1, 'Username is required'),
});
