import React from "react";
import { motion } from "framer-motion";
import { FRIENDS } from "../data/friends";

export default function FriendBubble({ friendKey, text, subtext, delay = 0, imageUrl }) {
  const friend =
    FRIENDS[friendKey] ||
    FRIENDS.samyam ||
    {
      name: "Friend",
      title: "Meetup Crew",
      emoji: "🙂",
      bg: "linear-gradient(135deg, #784ba0, #2b86c5)",
    };

  return (
    <motion.div
      className="friend-bubble"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
    >
      {/* Avatar */}
      <motion.div
        className="friend-avatar-wrap"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + 0.1, type: "spring", stiffness: 200, damping: 12 }}
      >
        <div className="friend-avatar-ring" />
        <div
          className="friend-avatar"
          style={{ background: !imageUrl ? friend.bg : 'var(--bg-card)' }}
          role="img"
          aria-label={`${friend.name} avatar`}
        >
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={friend.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <span style={{ fontSize: "4rem", lineHeight: 1 }}>{friend.emoji}</span>
          )}
        </div>
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        className="speech-bubble"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.25, type: "spring", stiffness: 150 }}
      >
        <div className="friend-name">{friend.name} — {friend.title}</div>
        <div className="friend-text">{text}</div>
        {subtext && (
          <div style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
            {subtext}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
