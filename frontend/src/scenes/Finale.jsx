import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import ConfettiBlast from "../components/ConfettiBlast";
import FloatingEmojis from "../components/FloatingEmojis";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Finale({ answers, photos }) {
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const submit = async () => {
      try {
        const res = await axios.post(`${API}/api/submit`, answers);
        setSubmitted(true);
      } catch (e) {
        toast.error("Something broke. We blame the WiFi. Or you. 🤷", { icon: "💀", duration: 4000 });
      } finally {
        setLoading(false);
      }
    };
    if (answers && answers.name) {
      submit();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="scene" id="finale-scene" style={{ gap: "1.5rem" }}>
      <FloatingEmojis />
      <ConfettiBlast trigger={!loading} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          background: "linear-gradient(135deg, rgba(255,60,172,0.2), rgba(43,134,197,0.18))",
          border: "1px solid rgba(255,60,172,0.45)",
          borderRadius: "var(--radius-lg)",
          padding: "1.25rem",
          width: "min(720px, 94vw)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", letterSpacing: "3px", color: "var(--accent-yellow)" }}>
            INVITE POSTER
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.25rem" }}>
            Thank you for submitting, {answers?.name || "friend"}!
          </div>
        </div>

        {photos?.last ? (
          <img
            src={photos.last}
            alt="Meetup invite poster"
            style={{
              width: "100%",
              maxHeight: "340px",
              objectFit: "cover",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
        ) : (
          <div
            style={{
              height: "220px",
              borderRadius: "14px",
              border: "1px dashed rgba(255,255,255,0.35)",
              display: "grid",
              placeItems: "center",
              color: "var(--text-muted)",
            }}
          >
            Upload an image to <b>meetup/last</b> to show the invite poster here.
          </div>
        )}

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", letterSpacing: "2px", color: "var(--accent-yellow)" }}>
            MAY 1 &amp; 2, 2026
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.25rem" }}>
            Friday &amp; Saturday - Be there or be square
          </div>
          <div style={{ marginTop: "0.55rem", color: "var(--accent-pink)", fontWeight: 700 }}>
            Please also bring Ashika with you, ok.
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", position: "relative", zIndex: 1 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <button
          className="btn btn-primary"
          onClick={() => toast("See you there! Don't be late. We will roast you. 🔥", { icon: "😈", duration: 4000 })}
          id="see-you-btn"
          style={{ fontSize: "1.5rem", padding: "1rem 3rem" }}
        >
          See you Friday/Saturday 😈
        </button>
        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          {submitted ? "✅ You're on the list. (We have a list now.)" : "📋 Saving your info..."}
        </span>
      </motion.div>
    </div>
  );
}
