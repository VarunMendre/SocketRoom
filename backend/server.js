import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import corsOptions from './config/corsOptions.js';
import initSockets from './sockets/index.js';
import { getHealth } from './controllers/healthController.js';
import { errorResponse } from './utils/successResponse.js';

const app = express();
const server = http.createServer(app);

// Extensions
app.use(cors(corsOptions));
app.use(express.json());

// Socket.io Setup
const io = new Server(server, {
  cors: corsOptions
});

// Initialize Sockets
initSockets(io);

// Routes
// Health check endpoint
app.get('/health', getHealth);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  return errorResponse(res, err.message || 'Internal Server Error', status, {
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start Server (Only if NOT in a Lambda environment)
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for serverless entry point (lambda.js)
export default app;
