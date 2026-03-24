import React, { useEffect, useRef, useState } from "react";

export default function ChatMeDemo() {
  const appRef = useRef(null);
  const cursorRef = useRef(null);
  const cbtnRef = useRef(null);
  const copybtnRef = useRef(null);
  const [scene, setScene] = useState("s1");
  const [copyDone, setCopyDone] = useState(false);
  const [copyPressed, setCopyPressed] = useState(false);
  const [createPressed, setCreatePressed] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [chips, setChips] = useState(["YOU"]);
  const [visEls, setVisEls] = useState(new Set());
  const chatDoneRef = useRef(false);
  const timersRef = useRef([]);

  function after(ms, fn) {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  }
  function vis(id, delay) {
    after(delay, () => setVisEls((p) => new Set([...p, id])));
  }
  function hid(id, delay) {
    after(delay, () =>
      setVisEls((p) => {
        const n = new Set(p);
        n.delete(id);
        return n;
      }),
    );
  }
  function setC(x, y) {
    if (cursorRef.current) {
      cursorRef.current.style.left = x + "px";
      cursorRef.current.style.top = y + "px";
    }
  }
  const V = (id) => visEls.has(id);

  function runAll() {
    chatDoneRef.current = false;
    const c = cursorRef.current;
    if (c) {
      c.style.transition = "none";
      c.style.opacity = "1";
    }
    setC(60, 60);
    setScene("s1");
    setCopyDone(false);
    setCopyPressed(false);
    setCreatePressed(false);
    setShareVisible(false);
    setChips(["YOU"]);
    setVisEls(new Set());

    after(200, () => {
      if (c)
        c.style.transition =
          "left 1.2s cubic-bezier(0.4,0,0.2,1),top 1.2s cubic-bezier(0.4,0,0.2,1)";
    });
    after(700, () => {
      const ar = appRef.current?.getBoundingClientRect();
      const r = cbtnRef.current?.getBoundingClientRect();
      if (ar && r)
        setC(
          r.left - ar.left + r.width * 0.5 - 6,
          r.top - ar.top + r.height * 0.5 - 6,
        );
    });
    after(1950, () => {
      setCreatePressed(true);
      after(180, () => {
        setCreatePressed(false);
        after(120, () => {
          setScene("s2");
          runScene2();
        });
      });
    });
  }

  function runScene2() {
    if (cursorRef.current)
      cursorRef.current.style.transition =
        "left 0.8s cubic-bezier(0.4,0,0.2,1),top 0.8s cubic-bezier(0.4,0,0.2,1)";
    after(500, () => {
      const ar = appRef.current?.getBoundingClientRect();
      const r = copybtnRef.current?.getBoundingClientRect();
      if (ar && r)
        setC(r.left - ar.left + r.width * 0.4, r.top - ar.top + r.height * 0.4);
    });
    after(1400, () => {
      setCopyPressed(true);
      after(160, () => {
        setCopyPressed(false);
        setCopyDone(true);
      });
    });
    after(1900, () => setShareVisible(true));
    after(2600, () => setChips(["YOU", "ALEX"]));
    after(3300, () => setChips(["YOU", "ALEX", "SAM"]));
    after(4400, () => {
      setScene("s3");
      runChat();
    });
  }

  function runChat() {
    if (chatDoneRef.current) return;
    chatDoneRef.current = true;
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
    vis("m1", 200);
    vis("fc1", 400);
    vis("t1", 900);
    hid("t1", 1700);
    vis("m2", 1800);
    vis("fc2", 2000);
    vis("t2", 2600);
    hid("t2", 3300);
    vis("m3", 3400);
    vis("fc3", 3600);
    vis("r1", 4100);
    vis("fc4", 4400);
    vis("t3", 4600);
    hid("t3", 5200);
    vis("m4", 5300);
    vis("fc5", 5500);
    vis("m5", 6800);
    vis("r2", 7400);
    vis("fc6", 7000);
    vis("fc7", 7800);
    vis("replay", 8400);
  }

  function restart() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    after(50, runAll);
  }

  useEffect(() => {
    after(600, runAll);
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const chipDotColors = ["#7C3AED", "#10b981", "#f97316"];

  /* ── shared styles ── */
  const mono = { fontFamily: "'Space Mono', monospace" };
  const bebas = { fontFamily: "'Bebas Neue', monospace" };

  return (
    <div
      ref={appRef}
      style={{
        ...mono,
        width: 680,
        height: 520,
        background: "#0f0f0f",
        border: "3px solid #7C3AED",
        boxShadow: "8px 8px 0 #7C3AED",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* ── SCENE 1: HOME ── */}
      {scene === "s1" && (
        <div style={{ position: "absolute", inset: 0, background: "#0f0f0f" }}>
          {/* nav */}
          <div
            style={{
              background: "#111",
              borderBottom: "2px solid #7C3AED",
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 28px",
            }}
          >
            <span
              style={{
                ...bebas,
                fontSize: 24,
                color: "#7C3AED",
                letterSpacing: 3,
              }}
            >
              ChatMe
            </span>
            <div style={{ display: "flex", gap: 18 }}>
              {["Home", "GitHub", "Docs"].map((l, i) => (
                <span
                  key={l}
                  style={{
                    fontSize: 9,
                    color: i === 0 ? "#fff" : "#666",
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          {/* hero */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "32px 40px 20px",
              gap: 32,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "inline-block",
                  background: "#7C3AED",
                  padding: "3px 10px",
                  fontSize: 8,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: 2,
                  marginBottom: 16,
                }}
              >
                100% FREE · OPEN SOURCE
              </div>
              <div
                style={{
                  ...bebas,
                  fontSize: 56,
                  lineHeight: 0.95,
                  color: "#fff",
                  letterSpacing: 2,
                  marginBottom: 12,
                }}
              >
                CONNECT
                <br />
                <span style={{ color: "#7C3AED" }}>INSTANTLY</span>
                <br />
                NO SIGNUP
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "#aaa",
                  letterSpacing: 1.5,
                  lineHeight: 2,
                  marginBottom: 24,
                }}
              >
                No registration required.
                <br />
                Create a room, share the ID.
              </div>
              <button
                ref={cbtnRef}
                style={{
                  background: "#7C3AED",
                  border: "2.5px solid #7C3AED",
                  padding: "13px 28px",
                  ...mono,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: 2,
                  boxShadow: createPressed
                    ? "1px 1px 0 #a855f7"
                    : "5px 5px 0 #a855f7",
                  transform: createPressed ? "translate(4px,4px)" : "none",
                  cursor: "pointer",
                  transition: "box-shadow 0.08s, transform 0.08s",
                  display: "block",
                }}
              >
                🚀 CREATE ROOM
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["⚡", "INSTANT", "#7C3AED"],
                ["🕵️", "PRIVATE", "#0f0f0f"],
                ["💬", "REAL-TIME", "#10b981"],
              ].map(([icon, label, bg]) => (
                <div
                  key={label}
                  style={{
                    background: bg,
                    border: "2px solid #7C3AED",
                    padding: "8px 14px",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  {label}
                </div>
              ))}
            </div>
          </div>
          {/* ticker */}
          <div
            style={{
              background: "#7C3AED",
              padding: "7px 0",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontSize: 8,
                color: "#fff",
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              {"⚡ INSTANT  //  🕵️ NO LOGS  //  💬 REAL-TIME  //  🔗 SHAREABLE  //  🚫 NO SIGNUP  //  ".repeat(
                6,
              )}
            </span>
          </div>
        </div>
      )}

      {/* ── SCENE 2: ROOM CREATED ── */}
      {scene === "s2" && (
        <div style={{ position: "absolute", inset: 0, background: "#0f0f0f" }}>
          <div
            style={{
              background: "#111",
              borderBottom: "2px solid #7C3AED",
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 28px",
            }}
          >
            <span style={{ fontSize: 9, color: "#7C3AED", fontWeight: 700 }}>
              ← BACK
            </span>
            <span
              style={{
                ...bebas,
                fontSize: 22,
                color: "#7C3AED",
                letterSpacing: 3,
              }}
            >
              ChatMe
            </span>
            <span
              style={{
                background: "#10b981",
                padding: "3px 10px",
                fontSize: 8,
                fontWeight: 700,
                color: "#fff",
                letterSpacing: 1,
              }}
            >
              ROOM READY
            </span>
          </div>
          <div style={{ padding: "28px 40px" }}>
            <div
              style={{
                fontSize: 9,
                color: "#666",
                fontWeight: 700,
                letterSpacing: 2,
                marginBottom: 10,
              }}
            >
              YOUR ROOM ID
            </div>
            <div
              style={{
                background: "#1a1a1a",
                border: "2px solid #7C3AED",
                padding: "18px 22px",
                boxShadow: "5px 5px 0 #7C3AED",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 8,
                    color: "#666",
                    letterSpacing: 2,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  ROOM IDENTIFIER
                </div>
                <div
                  style={{
                    ...bebas,
                    fontSize: 22,
                    color: "#fff",
                    letterSpacing: 2,
                  }}
                >
                  #ROOM-3F7C-1A2B
                </div>
              </div>
              <button
                ref={copybtnRef}
                style={{
                  background: copyDone ? "#10b981" : "#7C3AED",
                  border: "2px solid #7C3AED",
                  padding: "9px 16px",
                  ...mono,
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: 1,
                  boxShadow: copyPressed
                    ? "0 0 0 #a855f7"
                    : "3px 3px 0 #a855f7",
                  transform: copyPressed ? "translate(3px,3px)" : "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.08s",
                }}
              >
                {copyDone ? "COPIED! ✓" : "COPY ID"}
              </button>
            </div>
            {/* share toast */}
            <div
              style={{
                background: "#1a1a1a",
                border: "2px solid #7C3AED",
                padding: "16px 18px",
                boxShadow: "4px 4px 0 #7C3AED",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transform: shareVisible ? "translateY(0)" : "translateY(10px)",
                opacity: shareVisible ? 1 : 0,
                transition: "all 0.4s ease",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  background: "#7C3AED",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 16,
                }}
              >
                🔗
              </div>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: 1,
                  }}
                >
                  SHARE THIS ID WITH YOUR FRIENDS!
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: "#888",
                    marginTop: 3,
                    letterSpacing: 0.5,
                    lineHeight: 1.6,
                  }}
                >
                  Anyone with this ID can join instantly — no signup needed
                </div>
              </div>
            </div>
            {/* user chips */}
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 18,
                flexWrap: "wrap",
              }}
            >
              {chips.map((name, i) => (
                <div
                  key={name}
                  style={{
                    background: "#1a1a1a",
                    border: "2px solid #7C3AED",
                    padding: "5px 12px",
                    fontSize: 8,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    boxShadow: "2px 2px 0 #7C3AED",
                    animation: i > 0 ? "chipIn 0.3s ease both" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: chipDotColors[i] || "#10b981",
                      border: "1.5px solid #fff",
                      flexShrink: 0,
                    }}
                  />
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SCENE 3: CHAT ── */}
      {scene === "s3" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "stretch",
            background: "#0f0f0f",
          }}
        >
          {/* phone */}
          <div
            style={{
              width: 255,
              flexShrink: 0,
              background: "#111",
              margin: "12px 0 12px 20px",
              border: "2px solid #7C3AED",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "5px 5px 0 #7C3AED",
            }}
          >
            <div
              style={{
                background: "#1a1a1a",
                borderBottom: "2px solid #7C3AED",
                padding: "9px 12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    background: "#7C3AED",
                    border: "2px solid #a855f7",
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  A
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: 1,
                    }}
                  >
                    #ROOM-3F7C-1A2B
                  </div>
                  <div
                    style={{
                      fontSize: 7,
                      color: "#10b981",
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      marginTop: 1,
                    }}
                  >
                    ● ONLINE — 3 MEMBERS
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "#111",
                borderBottom: "1.5px solid #7C3AED",
                padding: "4px 8px",
                display: "flex",
                gap: 5,
              }}
            >
              {["ALEX", "YOU", "SAM"].map((n) => (
                <div
                  key={n}
                  style={{
                    background: "#1a1a1a",
                    border: "1.5px solid #7C3AED",
                    padding: "3px 7px",
                    fontSize: 7,
                    fontWeight: 700,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#10b981",
                    }}
                  />
                  {n}
                </div>
              ))}
            </div>
            {/* messages */}
            <div
              style={{
                background: "#0f0f0f",
                minHeight: 268,
                padding: "8px 8px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <MsgRow
                vis={V("m1")}
                dir="l"
                sender="ALEX"
                text="hey everyone! 👋"
                time="10:24 AM"
              />
              <TypingRow vis={V("t1")} label="YOU..." />
              <MsgRow
                vis={V("m2")}
                dir="r"
                text={"yo! ready to build 🚀\nsomething awesome?"}
                time="10:25 AM ✓✓"
              />
              <TypingRow vis={V("t2")} label="ALEX..." />
              <MsgRow
                vis={V("m3")}
                dir="l"
                sender="ALEX"
                reply='↩ YOU: "ready to build..."'
                text="100% let's go! 💯"
                reactions={V("r1") ? ["🔥 2", "👍 1"] : []}
              />
              <TypingRow vis={V("t3")} label="SAM..." />
              <MsgRow
                vis={V("m4")}
                dir="r"
                text={"no logs. no trace.\npure sockets. 🕵️"}
                time="10:26 AM ✓✓"
              />
              <MsgRow
                vis={V("m5")}
                dir="l"
                sender="SAM"
                text="this is wild! ✨"
                reactions={V("r2") ? ["🎉 3"] : []}
              />
            </div>
            {/* input bar */}
            <div
              style={{
                background: "#1a1a1a",
                borderTop: "2px solid #7C3AED",
                padding: "6px 8px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: "#0f0f0f",
                  border: "1.5px solid #7C3AED",
                  padding: "5px 7px",
                  fontSize: 7,
                  color: "#555",
                  ...mono,
                }}
              >
                Type message...
              </div>
              <div
                style={{
                  background: "#7C3AED",
                  border: "1.5px solid #7C3AED",
                  width: 27,
                  height: 27,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 14 14">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* feature cards */}
          <div
            style={{
              flex: 1,
              padding: "12px 14px 12px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 7,
              justifyContent: "center",
            }}
          >
            {[
              {
                id: "fc1",
                bg: "#7C3AED",
                icon: "👥",
                title: "WHO'S ONLINE",
                sub: "Live user panel",
              },
              {
                id: "fc2",
                bg: "#1a1a1a",
                icon: "⚡",
                title: "INSTANT ROOMS",
                sub: "No signup needed",
                border: "#7C3AED",
              },
              {
                id: "fc3",
                bg: "#1a1a1a",
                icon: "💬",
                title: "REPLY + REACT",
                sub: "Emoji reactions",
                border: "#7C3AED",
              },
              {
                id: "fc4",
                bg: "#10b981",
                icon: "↩",
                title: "REPLY THREAD",
                sub: "Context replies",
              },
              {
                id: "fc5",
                bg: "#f97316",
                icon: "🕵️",
                title: "ZERO LOGS",
                sub: "Ephemeral chat",
              },
              {
                id: "fc6",
                bg: "#1a1a1a",
                icon: "🔍",
                title: "SEARCH MSGS",
                sub: "Filter by keyword",
                border: "#7C3AED",
              },
              {
                id: "fc7",
                bg: "#7C3AED",
                icon: "📥",
                title: "EXPORT CHAT",
                sub: "Save transcript",
              },
            ].map(({ id, bg, icon, title, sub, border }) => (
              <div
                key={id}
                style={{
                  background: bg,
                  border: `2px solid ${border || bg}`,
                  padding: "8px 12px",
                  boxShadow: `3px 3px 0 ${border || bg}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  opacity: V(id) ? 1 : 0,
                  transform: V(id) ? "translateX(0)" : "translateX(14px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    flexShrink: 0,
                    width: 20,
                    textAlign: "center",
                  }}
                >
                  {icon}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: 0.8,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontSize: 7,
                      color: "rgba(255,255,255,0.6)",
                      marginTop: 1,
                    }}
                  >
                    {sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CURSOR ── */}
      <svg
        ref={cursorRef}
        width="28"
        height="36"
        viewBox="0 0 30 38"
        style={{
          position: "absolute",
          zIndex: 999,
          pointerEvents: "none",
          left: 80,
          top: 80,
        }}
      >
        <path
          d="M5 3 L5 30 L12 23 L17 34 L21 32 L16 21 L26 21 Z"
          fill="#fff"
          stroke="#7C3AED"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* ── REPLAY ── */}
      {V("replay") && (
        <button
          onClick={restart}
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#7C3AED",
            border: "2px solid #a855f7",
            padding: "6px 18px",
            fontSize: 8,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 2,
            cursor: "pointer",
            boxShadow: "3px 3px 0 #a855f7",
            whiteSpace: "nowrap",
            ...mono,
          }}
        >
          ↩ REPLAY FROM START
        </button>
      )}

      <style>{`
        @keyframes chipIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes tdb { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)} }
      `}</style>
    </div>
  );
}

function MsgRow({ vis, dir, sender, text, time, reply, reactions = [] }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: dir === "r" ? "flex-end" : "flex-start",
        opacity: vis ? 1 : 0,
        transform: vis
          ? "translateX(0)"
          : dir === "r"
            ? "translateX(8px)"
            : "translateX(-8px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        fontFamily: "'Space Mono', monospace",
      }}
    >
      {sender && (
        <div
          style={{
            fontSize: "6.5px",
            fontWeight: 700,
            color: "#7C3AED",
            marginBottom: 2,
            letterSpacing: 0.5,
          }}
        >
          {sender}
        </div>
      )}
      <div
        style={{
          maxWidth: "76%",
          padding: reply ? "7px 9px 7px 13px" : "7px 9px",
          border: `2px solid ${dir === "r" ? "#10b981" : "#7C3AED"}`,
          fontSize: 8,
          lineHeight: 1.5,
          position: "relative",
          background: dir === "r" ? "#0d2e22" : "#1a1040",
          color: "#fff",
          boxShadow: `2px 2px 0 ${dir === "r" ? "#10b981" : "#7C3AED"}`,
        }}
      >
        {reply && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 3,
              background: "#f97316",
            }}
          />
        )}
        {reply && (
          <div
            style={{
              fontSize: "6.5px",
              color: "#888",
              fontStyle: "italic",
              paddingLeft: reply ? 5 : 0,
              marginBottom: 3,
            }}
          >
            {reply}
          </div>
        )}
        {text.split("\n").map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      {time && (
        <div style={{ fontSize: 6, color: "#555", marginTop: 2 }}>{time}</div>
      )}
      {reactions.length > 0 && (
        <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
          {reactions.map((r) => (
            <span
              key={r}
              style={{
                background: "#1a1a1a",
                border: "1.5px solid #7C3AED",
                padding: "1px 5px",
                fontSize: 8,
                color: "#fff",
              }}
            >
              {r}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function TypingRow({ vis, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        opacity: vis ? 1 : 0,
        transition: "opacity 0.25s",
        height: 20,
        fontFamily: "'Space Mono', monospace",
      }}
    >
      <div
        style={{
          background: "#1a1040",
          border: "1.5px solid #7C3AED",
          padding: "4px 7px",
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        {[0, 0.15, 0.3].map((d, i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#7C3AED",
              animation: `tdb 0.8s ${d}s infinite`,
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: "6.5px",
          color: "#7C3AED",
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {label}
      </span>
    </div>
  );
}
