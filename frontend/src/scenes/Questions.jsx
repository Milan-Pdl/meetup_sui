import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import FriendBubble from "../components/FriendBubble";
import FloatingEmojis from "../components/FloatingEmojis";
import { QUESTIONS, AFTER_ANSWERS } from "../data/friends";

function getAfterComment(field, value) {
  const bank = AFTER_ANSWERS[field] || ["{v} — interesting."];
  const tmpl = bank[Math.floor(Math.random() * bank.length)];
  return tmpl.replace(/{v}/g, value);
}

export default function Questions({ onUpdate, answers, photos }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");
  const [yesNo, setYesNo] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const inputRef = useRef(null);

  const q = QUESTIONS[step];

  useEffect(() => {
    setValue("");
    setYesNo(null);
    setShowComment(false);
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const handleAnswer = () => {
    const finalVal = q.type === "yesno" ? yesNo : value.trim();
    if (finalVal === null || finalVal === "" || finalVal === undefined) {
      toast.error("Come on, don't leave it blank! 😤", { icon: "🙄" });
      return;
    }

    // Build update
    const field = q.field;
    const update = { [field]: q.type === "yesno" ? finalVal === "yes" : finalVal };
    onUpdate(update);

    // Show funny comment
    const c = getAfterComment(field, String(q.type === "yesno" ? (finalVal === "yes" ? "Yes 💔" : "No, never 🙏") : finalVal));
    setComment(c);
    setShowComment(true);

    toast(c, { icon: q.emoji, duration: 2500 });

    setTimeout(() => {
      setShowComment(false);
      if (step < QUESTIONS.length - 1) {
        setStep((s) => s + 1);
      } else {
        toast.success("Thank you for submitting! Building your invite poster...", {
          icon: "🙏",
          duration: 2500,
        });
        navigate("/finale");
      }
    }, 1800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAnswer();
  };

  return (
    <div className="scene" id="questions-scene">
      <FloatingEmojis />

      {/* Progress dots */}
      <motion.div
        className="progress-dots"
        style={{ position: "relative", zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`dot ${i < step ? "done" : i === step ? "active" : ""}`}
          />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3.5rem", zIndex: 1, width: "100%", maxWidth: "540px", paddingBottom: "2rem" }}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          {/* Friend asking */}
          <FriendBubble
            friendKey={q.friend}
            text={q.question}
            subtext={q.subtext}
            delay={0}
            imageUrl={photos?.[q.friend]}
          />

          {/* Input area */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", width: "100%" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {q.type === "text" && (
              <input
                ref={inputRef}
                className="fancy-input"
                type="text"
                placeholder={q.placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                id={`input-${q.id}`}
                autoComplete="off"
                maxLength={80}
              />
            )}

            {q.type === "yesno" && (
              <div className="yes-no-wrap">
                <button
                  className={`yn-btn yes ${yesNo === "yes" ? "selected" : ""}`}
                  onClick={() => setYesNo("yes")}
                  id={`${q.id}-yes`}
                >
                  Yes 💔
                </button>
                <button
                  className={`yn-btn no ${yesNo === "no" ? "selected" : ""}`}
                  onClick={() => setYesNo("no")}
                  id={`${q.id}-no`}
                >
                  No, never 🙏
                </button>
              </div>
            )}

            {/* Submit */}
            <AnimatePresence>
              {!showComment ? (
                <motion.button
                  className="btn btn-primary"
                  onClick={handleAnswer}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  id={`submit-q${step}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {step < QUESTIONS.length - 1 ? "Next →" : "Finish 🎉"}
                </motion.button>
              ) : (
                <motion.div
                  style={{
                    padding: "1rem 2rem",
                    background: "rgba(255,215,0,0.1)",
                    border: "1px solid var(--accent-yellow)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--accent-yellow)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    textAlign: "center",
                    maxWidth: "380px",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {comment}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step counter */}
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              Question {step + 1} of {QUESTIONS.length}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
