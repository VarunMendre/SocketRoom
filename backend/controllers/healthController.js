import { dynamoService } from '../services/dynamoService.js';
import { successResponse } from '../utils/successResponse.js';

export const getHealth = async (req, res) => {
    const activeCount = await dynamoService.getActiveRoomsCount();
    return successResponse(res, { 
        status: 'OK', 
        activeRooms: activeCount,
        mode: process.env.AWS_LAMBDA_FUNCTION_NAME ? 'Serverless' : 'Local-Mock'
    });
};
