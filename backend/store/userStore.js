import { dynamoService } from '../services/dynamoService.js';

// 
export const activeRooms = {
    get size() {
        // can't do sync size for Dynamo, we'll mark this as deprecated
        return 0; 
    }
};

export const userStore = dynamoService;
