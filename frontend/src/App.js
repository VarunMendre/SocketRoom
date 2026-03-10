import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatRoom from './pages/ChatRoom';
import LandingPage from './pages/LandingPage';

function App() {
  const hostname = window.location.hostname;
  const isAppSubdomain = hostname.startsWith('chat-app.');

  // If we are on the main domain (chat-me.cloudvault.cloud), default to landing
  if (!isAppSubdomain && hostname !== 'localhost' && hostname !== '127.0.0.1') {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div style={{ width: '100%', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/chat/:roomId" element={<ChatRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;