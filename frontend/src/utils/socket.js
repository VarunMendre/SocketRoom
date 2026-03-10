import { io } from 'socket.io-client';

const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const WS_URL = process.env.REACT_APP_WS_URL || 'wss://your-aws-endpoint.com/dev';

let socket;

if (isDevelopment) {
    // 1. Local Development: Use standard Socket.IO
    socket = io('http://localhost:3001', {
        transports: ['websocket', 'polling']
    });
} else {
    // 2. Production (AWS): Use Native WebSockets to match API Gateway
    // We create a wrapper that mimics the socket.io API
    const ws = new WebSocket(WS_URL);
    const listeners = {};

    socket = {
        id: 'aws-client',
        connected: false,
        on: (event, callback) => {
            if (!listeners[event]) listeners[event] = [];
            listeners[event].push(callback);
        },
        emit: (event, data) => {
            if (ws.readyState === WebSocket.OPEN) {
                // AWS Lambda expects this format for the $default route
                ws.send(JSON.stringify({
                    action: event,
                    data: data
                }));
            }
        },
        disconnect: () => ws.close()
    };

    ws.onopen = () => {
        socket.connected = true;
        console.log('✅ AWS WebSocket Connected');
        if (listeners['connect']) listeners['connect'].forEach(cb => cb());
    };

    ws.onmessage = (message) => {
        try {
            const { event, data } = JSON.parse(message.data);
            if (listeners[event]) {
                listeners[event].forEach(cb => cb(data));
            }
        } catch (e) {
            console.error('Error parsing WS message:', e);
        }
    };

    ws.onclose = () => {
        socket.connected = false;
        console.log('❌ AWS WebSocket Disconnected');
        if (listeners['disconnect']) listeners['disconnect'].forEach(cb => cb());
    };

    ws.onerror = (err) => {
        console.error('🔴 WS Error:', err);
    };
}

export default socket;