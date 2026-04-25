import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingEmojis from "../components/FloatingEmojis";
import { FRIENDS } from "../data/friends";

const LANDING_LINES = [
  "Babe, mero sccoter ma chadxau timi??. 😂",
];

// 3 featured friends for the landing photo strip
const FEATURED = [
  {
    key: "samyam",
    quote: "babe,Hero xaina ta ma??. 🌪️",
    tagline: "Scooter wala",
  },
  {
    key: "uttam",
    quote: "Ashika kaha xau timi?? 🍹",
    tagline: "Dealer.",
  },
  {
    key: "suman",
    quote: "Ayusha timro doggy ko name k ho??. 🍕",
    tagline: "Huna na sakako laura.",
  },
];

function FriendCard({ friendKey, quote, tagline, isActive, onClick, index, imageUrl }) {
  const friend = FRIENDS[friendKey];
  return (
    <motion.div
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        padding: "1.25rem 1rem",
        borderRadius: "var(--radius-lg)",
        background: isActive
          ? "linear-gradient(145deg, rgba(255,60,172,0.15), rgba(120,75,160,0.15))"
          : "rgba(255,255,255,0.03)",
        border: isActive
          ? "1.5px solid rgba(255,60,172,0.5)"
          : "1.5px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s ease",
        flex: 1,
        minWidth: 0,
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 120 }}
      whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(255,60,172,0.25)" }}
    >
      {/* Glow blob behind active card */}
      {isActive && (
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 30%, rgba(255,60,172,0.18), transparent 70%)",
            pointerEvents: "none",
          }}
          layoutId="card-glow"
        />
      )}

      {/* Avatar */}
      <div style={{ position: "relative" }}>
        {isActive && (
          <motion.div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#ff3cac,#784ba0,#2b86c5)",
              zIndex: 0,
              animation: "ring-spin 3s linear infinite",
            }}
            layoutId="active-ring"
          />
        )}
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: !imageUrl ? friend.bg : 'var(--bg-card)',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.8rem",
            position: "relative",
            zIndex: 1,
            boxShadow: isActive ? "0 0 24px rgba(255,60,172,0.4)" : "none",
            overflow: 'hidden'
          }}
        >
          {imageUrl ? (
            <img src={imageUrl} alt={friend.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            friend.emoji
          )}
        </div>
      </div>

      {/* Name + tagline */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.2rem",
            letterSpacing: "2px",
            color: isActive ? "var(--accent-pink)" : "var(--text-primary)",
          }}
        >
          {friend.name}
        </div>
        <div
          style={{
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "var(--text-muted)",
            marginTop: "0.1rem",
          }}
        >
          {tagline}
        </div>
      </div>

      {/* Quote bubble */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: "0.82rem",
              color: "var(--text-secondary)",
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.5,
              padding: "0 0.25rem",
            }}
          >
            &ldquo;{quote}&rdquo;
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active indicator dot */}
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: isActive ? "var(--accent-pink)" : "transparent",
          boxShadow: isActive ? "0 0 8px var(--accent-pink)" : "none",
          transition: "all 0.3s ease",
        }}
      />
    </motion.div>
  );
}

export default function Landing({ photos }) {
  const navigate = useNavigate();
  const [activeFriend, setActiveFriend] = useState(0);
  const line = LANDING_LINES[Math.floor(Math.random() * LANDING_LINES.length)];

  // Auto-cycle through friends every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFriend((prev) => (prev + 1) % FEATURED.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="scene" id="landing-scene" style={{ gap: "1.5rem" }}>
      <FloatingEmojis />
      <div className="landing-glow" />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", position: "relative", zIndex: 1 }}
      >
        <h1 className="display-title">FRIDAY &amp; SATURDAY<br />MEETUP</h1>
        <motion.p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.4rem",
            letterSpacing: "4px",
            color: "var(--accent-yellow)",
            marginTop: "0.4rem",
          }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          MAY 1 &amp; 2, 2026
        </motion.p>
      </motion.div>

      {/* Speech bubble from active friend */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 460,
          width: "100%",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFriend}
            className="speech-bubble"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            style={{ textAlign: "center" }}
          >
            <div className="friend-name">
              {FRIENDS[FEATURED[activeFriend].key].name} says:
            </div>
            <div className="friend-text">
              {activeFriend === 0 ? line : FEATURED[activeFriend].quote}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* 3-friend photo strip */}
      <motion.div
        className="landing-strip"
        style={{
          display: "flex",
          gap: "0.75rem",
          width: "100%",
          maxWidth: 520,
          position: "relative",
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {FEATURED.map((f, i) => (
          <FriendCard
            key={f.key}
            friendKey={f.key}
            quote={f.quote}
            tagline={f.tagline}
            isActive={activeFriend === i}
            onClick={() => setActiveFriend(i)}
            index={i}
            imageUrl={photos?.[f.key]}
          />
        ))}
      </motion.div>

      {/* Photo slot hint */}
      <motion.p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.75rem",
          letterSpacing: "1px",
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        📸 Real photos coming soon · Click a card to preview
      </motion.p>

      {/* CTA */}
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          position: "relative",
          zIndex: 1,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.button
          className="btn btn-primary"
          onClick={() => navigate("/who-are-you")}
          id="enter-chaos-btn"
          whileHover={{ scale: 1.06, y: -4 }}
          whileTap={{ scale: 0.97 }}
        >
          Chaldim la ghumna 🌪️
        </motion.button>
        <span style={{ color: "var(--text-muted)", fontSize: "0.83rem" }}>
          No promises. Full chaos. Guaranteed fun (maybe).
        </span>
      </motion.div>
    </div>
  );
}
