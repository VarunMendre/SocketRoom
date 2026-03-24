import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import ChatMeDemo from "./ChatMeDemo";

const LandingPage = () => {
  const [demoScale, setDemoScale] = useState(1);

  useLayoutEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 768) {
        const scale = Math.min(0.95, (width - 40) / 680);
        setDemoScale(scale);
      } else if (width < 1400) {
        // Subtle scaling for tablet/laptop if needed, or keep at 1
        const scale = Math.min(1, (width * 0.5) / 680); 
        setDemoScale(Math.max(0.8, scale)); // Don't shrink too much on tablet
      } else {
        setDemoScale(1);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="landing-container">
      {/* Decorative Blobs */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <nav className="landing-nav">
        <Link to="/" className="logo">
          ChatMe
        </Link>
        <div className="nav-actions">
          <a
            href="https://chat-me.cloudvault.cloud"
            className="nav-link"
          >
            Home
          </a>
          <a href="https://chat-app.cloudvault.cloud" className="btn-primary">
            Get Started
          </a>
        </div>
      </nav>

      <main>
        {/* ── HERO SECTION ── */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="headline">
              REAL TIME CHAT <br />
              WITHOUT <span className="text-purple">FRICTION</span>
            </h1>
            <p className="hero-sub">
              CREATE A ROOM INSTANTLY AND START CHATTING WITH
              ANYONE. NO LOGIN. NO SETUP. JUST SHARE THE ROOM AND
              TALK.
            </p>
            <div className="hero-btns">
              <a
                href="https://chat-app.cloudvault.cloud"
                className="btn-primary hero-main-btn"
              >
                START CHATTING !!!
              </a>
            </div>
          </div>

          <div className="demo-wrapper" style={{ height: 520 * demoScale }}>
            <div className="demo-scaler" style={{ transform: `scale(${demoScale})` }}>
              {/* decorative corner accents matching your purple theme */}
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  width: 22,
                  height: 22,
                  borderTop: "3px solid #000",
                  borderLeft: "3px solid #000",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  width: 22,
                  height: 22,
                  borderTop: "3px solid #000",
                  borderRight: "3px solid #000",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -10,
                  left: -10,
                  width: 22,
                  height: 22,
                  borderBottom: "3px solid #000",
                  borderLeft: "3px solid #000",
                  zIndex: 1,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -10,
                  right: -10,
                  width: 22,
                  height: 22,
                  borderBottom: "3px solid #000",
                  borderRight: "3px solid #000",
                  zIndex: 1,
                }}
              />

              {/* "LIVE DEMO" badge */}
              <div
                style={{
                  position: "absolute",
                  top: -18,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#000",
                  padding: "3px 14px",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: 2,
                  fontFamily: "'Space Mono', monospace",
                  whiteSpace: "nowrap",
                  zIndex: 2,
                }}
              >
                ● LIVE DEMO
              </div>

              <ChatMeDemo />
            </div>
          </div>
        </section>

        {/* Services Section — unchanged */}
        <section style={{ padding: "6rem 0" }}>
          <h2 className="section-title">OUR SERVICES</h2>
          <div className="services-grid">
            <div className="service-card">
              <span className="card-icon">⚡</span>
              <h3>NO LOGIN</h3>
              <p>
                NO ACCOUNTS NECESSARY. START CHATTING INSTANTLY WITH ANYONE, ANYWHERE.
              </p>
            </div>
            <div className="service-card">
              <span className="card-icon">💬</span>
              <h3>REAL-TIME CHAT</h3>
              <p>
                MESSAGES APPEAR INSTANTLY USING REAL-TIME SOCKET COMMUNICATION. NO LAG.
              </p>
            </div>
            <div className="service-card">
              <span className="card-icon">🔗</span>
              <h3>INSTANT ROOMS</h3>
              <p>
                CREATE A ROOM INSTANTLY AND INVITE OTHERS WITH A UNIQUE ROOM ID.
              </p>
            </div>
          </div>
        </section>

        {/* Important Info Section — unchanged */}
        <section className="info-section">
          <div className="info-content">
            <div className="info-text-block">
              <h2>Important Information</h2>
              <ul className="info-list">
                <li className="info-list-item">
                  <strong>Security</strong>
                  All chats are ephemeral. Use at
                  your own discretion.
                </li>
                <li className="info-list-item">
                  <strong>Limits</strong>
                  Currently supports up to 100
                  participants per room.
                </li>
                <li className="info-list-item">
                  <strong>Connectivity</strong>
                  Ensure you are on a stable
                  internet connection for the best experience.
                </li>
              </ul>
            </div>
            <div
              className="info-text-block"
              style={{ background: "#7C3AED", color: "white" }}
            >
              <h2 style={{ color: "white" }}>The Tech Stack</h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
                ChatMe is built using the most modern and robust technologies:
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <span
                  className="btn-primary"
                  style={{ background: "white", fontSize: "0.8rem" }}
                >
                  REACT.JS
                </span>
                <span
                  className="btn-primary"
                  style={{ background: "white", fontSize: "0.8rem" }}
                >
                  NODE.JS
                </span>
                <span
                  className="btn-primary"
                  style={{ background: "white", fontSize: "0.8rem" }}
                >
                  SOCKET.IO
                </span>
                <span
                  className="btn-primary"
                  style={{ background: "white", fontSize: "0.8rem" }}
                >
                  EXPRESS
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Marquee Footer — unchanged */}
      <footer className="marquee-container">
        <div className="marquee-text">
          <span className="marquee-item">
            ChatMe 2026 // Real-Time Communication // No Logs // Pure Sockets //
          </span>
          <span className="marquee-item">
            ChatMe 2026 // Real-Time Communication // No Logs // Pure Sockets //
          </span>
          <span className="marquee-item">
            ChatMe 2026 // Real-Time Communication // No Logs // Pure Sockets //
          </span>
          <span className="marquee-item">
            ChatMe 2026 // Real-Time Communication // No Logs // Pure Sockets //
          </span>
        </div>
      </footer>

      {/* Google Fonts for Space Mono + Bebas Neue used inside the demo */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap"
      />
    </div>
  );
};

export default LandingPage;
