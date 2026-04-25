import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function InterestTrap({ photos }) {
  const navigate = useNavigate();
  const [dodgePos, setDodgePos] = useState({ top: "50%", left: "50%" });
  const [hasDodged, setHasDodged] = useState(false);

  const handleInterested = () => {
    toast("Awesome. See you there! 🎉", { icon: "🔥", duration: 1800 });
    setTimeout(() => navigate("/questions"), 1200);
  };

  const handleDodge = () => {
    const newTop = Math.floor(Math.random() * 70 + 15) + "%";
    const newLeft = Math.floor(Math.random() * 70 + 15) + "%";
    setDodgePos({ top: newTop, left: newLeft });
    setHasDodged(true);
    if (Math.random() > 0.5) {
      toast("Nice try! 😂", { icon: "😝", duration: 1000 });
    }
  };

  return (
    <div className="scene" id="interest-trap-scene">
      <div style={{ textAlign: "center", marginBottom: "2rem", zIndex: 1 }}>
        <motion.h2
          className="display-title"
          style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", marginBottom: "0.5rem" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          Are you interested in going with us?? 🤨
        </motion.h2>
        <p className="subtitle">There is only one correct answer.</p>
      </div>

      <motion.div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", width: "min(420px, 92vw)", position: "relative" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.button
          className="btn btn-interest"
          onClick={handleInterested}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          id="interested-btn"
          style={{ width: "100%", zIndex: 2 }}
        >
          YES, ABSOLUTELY! 😍
        </motion.button>

        <motion.button
          className={`btn btn-dodge ${hasDodged ? "" : "relative-dodge"}`}
          onMouseEnter={handleDodge}
          onClick={handleDodge}
          style={{
            position: hasDodged ? "fixed" : "relative",
            top: hasDodged ? dodgePos.top : "auto",
            left: hasDodged ? dodgePos.left : "auto",
            width: hasDodged ? "auto" : "100%",
            transition: "all 0.15s ease-out",
            whiteSpace: "nowrap"
          }}
          id="not-interested-btn"
        >
          Not Interested 😤
        </motion.button>
      </motion.div>
    </div>
  );
}
