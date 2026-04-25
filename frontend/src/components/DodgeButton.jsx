import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DODGE_MESSAGES = [
  "Nope 😏", "Try again buddy", "Wrong choice", "LOL no", "Keep trying",
  "Not a chance 🏃", "Move along", "Absolutely not", "Hahaha no"
];

export default function DodgeButton({ onDodgeComplete, containerRef }) {
  const [dodgeCount, setDodgeCount] = useState(0);
  const [pos, setPos] = useState({ top: 60, left: 50 });
  const [msg, setMsg] = useState("Not Interested 🙄");
  const [clickable, setClickable] = useState(false);
  const MAX_DODGES = 5;

  const dodge = () => {
    if (clickable) return;
    const newCount = dodgeCount + 1;
    setDodgeCount(newCount);

    const container = containerRef?.current;
    const w = container ? container.offsetWidth : 400;
    const h = container ? container.offsetHeight : 200;
    const newTop = 20 + Math.random() * 55;
    const newLeft = 10 + Math.random() * 70;
    setPos({ top: newTop, left: newLeft });
    setMsg(DODGE_MESSAGES[newCount % DODGE_MESSAGES.length]);

    if (newCount >= MAX_DODGES) {
      setClickable(true);
      setMsg("Fine. Click me then. 😤");
    }
  };

  return (
    <button
      className="btn btn-dodge"
      style={{
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        cursor: clickable ? "pointer" : "default",
        opacity: 1,
        minWidth: "180px",
      }}
      onMouseEnter={!clickable ? dodge : undefined}
      onTouchStart={!clickable ? dodge : undefined}
      onClick={clickable ? onDodgeComplete : dodge}
      id="not-interested-btn"
      aria-label="Not interested button"
    >
      {msg}
    </button>
  );
}
