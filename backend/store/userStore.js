// Store active rooms and users
export const activeRooms = new Map(); // roomId -> Set of usernames
export const userSockets = new Map(); // socketId -> { username, roomId }
