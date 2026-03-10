import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Decorative Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <nav className="landing-nav">
        <Link to="/" className="logo">ChatMe</Link>
        <div className="nav-actions">
          <a href="https://chat-me.cloudvault.cloud" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold', marginRight: '20px' }}>Home</a>
          <a href="https://app.chat-me.cloudvault.cloud" className="btn-primary">Get Started</a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="headline">
            Connect <span className="text-purple">Instantly</span> <br />
            No <span className="text-pink">Registration</span> Required
          </h1>
          <p className="hero-sub">
            The most raw, fast, and brutal way to chat in real-time. 
            Create a room, share the ID, and start talking. No strings attached.
          </p>
          <div className="hero-btns">
            <a href="https://app.chat-me.cloudvault.cloud" className="btn-primary" style={{ fontSize: '1.5rem', padding: '1rem 2.5rem' }}>
              Launch Chat Engine 🚀
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section style={{ padding: '4rem 0' }}>
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card card-purple">
              <span className="card-icon">⚡</span>
              <h3>Instant Rooms</h3>
              <p>Generate a unique Room ID in milliseconds. No databases, no waiting, just pure socket communication.</p>
            </div>
            <div className="service-card card-orange">
              <span className="card-icon">🕵️</span>
              <h3>Total Privacy</h3>
              <p>We don't store your messages. Once the room is closed, the data is gone. Like it never happened.</p>
            </div>
            <div className="service-card card-green">
              <span className="card-icon">🌍</span>
              <h3>Global Relay</h3>
              <p>Powered by Socket.io for low-latency message delivery across the globe. Smooth as silk.</p>
            </div>
          </div>
        </section>

        {/* Important Info Section */}
        <section className="info-section">
          <div className="info-content">
            <div className="info-text-block">
              <h2>Important Information</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '1rem', borderLeft: '5px solid black', paddingLeft: '1rem' }}>
                  <strong>Security:</strong> All chats are ephemeral. Use at your own discretion.
                </li>
                <li style={{ marginBottom: '1rem', borderLeft: '5px solid black', paddingLeft: '1rem' }}>
                  <strong>Limits:</strong> Currently supports up to 100 participants per room.
                </li>
                <li style={{ marginBottom: '1rem', borderLeft: '5px solid black', paddingLeft: '1rem' }}>
                  <strong>Connectivity:</strong> Ensure you are on a stable internet connection for the best experience.
                </li>
              </ul>
            </div>
            <div className="info-text-block" style={{ background: '#7C3AED', color: 'white' }}>
              <h2 style={{ color: 'white' }}>The Tech Stack</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                ChatMe is built using the most modern and robust technologies:
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span className="btn-primary" style={{ background: 'white', fontSize: '0.8rem' }}>REACT.JS</span>
                <span className="btn-primary" style={{ background: 'white', fontSize: '0.8rem' }}>NODE.JS</span>
                <span className="btn-primary" style={{ background: 'white', fontSize: '0.8rem' }}>SOCKET.IO</span>
                <span className="btn-primary" style={{ background: 'white', fontSize: '0.8rem' }}>EXPRESS</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Marquee Footer */}
      <footer className="marquee-container">
        <div className="marquee-text">
          <span className="marquee-item">ChatMe 2026 // Real-Time Communication // No Logs // Pure Sockets //</span>
          <span className="marquee-item">ChatMe 2026 // Real-Time Communication // No Logs // Pure Sockets //</span>
          <span className="marquee-item">ChatMe 2026 // Real-Time Communication // No Logs // Pure Sockets //</span>
          <span className="marquee-item">ChatMe 2026 // Real-Time Communication // No Logs // Pure Sockets //</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
