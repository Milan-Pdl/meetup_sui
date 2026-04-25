import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import FriendBubble from "../components/FriendBubble";
import FloatingEmojis from "../components/FloatingEmojis";

const GENDERS = [
  { label: "Male 💪", value: "male" },
  { label: "Female 💅", value: "female" },
  { label: "Other ✨", value: "other" },
];

const REACTIONS = {
  "male": "welcome mero bhai 👍",
  "female": "Thankyou for being honest, babe 💅",
  "other": "Valid. Extremely valid. The vibe is immaculate 🌈",
};

export default function WhoAreYou({ onUpdate, photos }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [reacted, setReacted] = useState(false);

  const handleSelect = (val) => {
    setSelected(val);
    setReacted(false);
    setTimeout(() => setReacted(true), 300);
    toast(REACTIONS[val], { icon: "👀", duration: 3000 });
    onUpdate({ gender: val });
  };

  const handleContinue = () => {
    if (!selected) {
      toast.error("Pick one! Any one. We don't judge. (We do.)", { icon: "😤" });
      return;
    }
    navigate("/interested");
  };

  return (
    <div className="scene" id="who-are-you-scene">
      <FloatingEmojis />

      <div style={{ textAlign: "center", zIndex: 1, marginBottom: "1rem" }}>
        <motion.h2
          className="display-title"
          style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", marginBottom: "0.5rem" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          k vo gender vana ta?
        </motion.h2>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
        
        </motion.p>
      </div>

      <AnimatePresence mode="wait">
        {selected && reacted && (
          <motion.div
            key="reaction"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              padding: "1rem 2rem",
              background: "rgba(255,60,172,0.1)",
              border: "1px solid var(--accent-pink)",
              borderRadius: "var(--radius-md)",
              color: "var(--accent-pink)",
              fontWeight: 600,
              fontSize: "1.1rem",
              textAlign: "center",
              marginTop: "1rem",
              zIndex: 1
            }}
          >
            {REACTIONS[selected]}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", position: "relative", zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="gender-grid">
          {GENDERS.map((g) => (
            <button
              key={g.value}
              className={`gender-pill ${selected === g.value ? "selected" : ""}`}
              onClick={() => handleSelect(g.value)}
              id={`gender-${g.value}`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {selected && (
          <motion.button
            className="btn btn-primary"
            onClick={handleContinue}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            id="who-continue-btn"
          >
            That's me. Continue! →
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
