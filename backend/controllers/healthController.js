import { activeRooms } from '../store/userStore.js';
import { successResponse } from '../utils/successResponse.js';

export const getHealth = (req, res) => {
    return successResponse(res, { status: 'OK', activeRooms: activeRooms.size });
};
