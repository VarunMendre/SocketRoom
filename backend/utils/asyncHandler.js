import { CustomError } from './ErrorResponse.js';

// For Express routes (req, res, next)
export const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// For Socket.io event handlers (io, socket, data)
export const socketAsyncHandler = (fn) => async (io, socket, data) => {
    try {
        await Promise.resolve(fn(io, socket, data));
    } catch (err) {
        // Log the error for server-side monitoring
        console.error(`[SocketError] ${err.name}: ${err.message}`);

        const isCustom = err instanceof CustomError;

        socket.emit('error_message', {
            success: false,
            error: err.message || 'Internal Server Error',
            status: isCustom ? err.status : 500,
            code: isCustom ? err.code : undefined,
            details: isCustom ? err.details : undefined,
            timestamp: isCustom ? err.timestamp : new Date().toISOString(),
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

export default asyncHandler;
