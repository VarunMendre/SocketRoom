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

// Global Error Handler for Express
app.use((err, req, res, next) => {
  console.error('Express Error:', err);
  const status = err.statusCode || 500;
  return errorResponse(res, err.message || 'Internal Server Error', status, {
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});