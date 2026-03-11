import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatRoom from './pages/ChatRoom';
import LandingPage from './pages/LandingPage';

function App() {
  const hostname = window.location.hostname;
  // Detect if we are on the app subdomain or local development
  const isAppSubdomain = hostname.startsWith('chat-app.') || hostname === 'localhost' || hostname === '127.0.0.1';

  return (
    <Router>
      <div style={{ width: '100%', minHeight: '100vh' }}>
        <Routes>
          {isAppSubdomain ? (
            // App Subdomain Routes
            <>
              <Route path="/" element={<Home />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/chat/:roomId" element={<ChatRoom />} />
            </>
          ) : (
            // Main Domain (Landing Only)
            <Route path="*" element={<LandingPage />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;