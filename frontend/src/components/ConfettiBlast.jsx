import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function ConfettiBlast({ trigger }) {
  const fired = useRef(false);

  useEffect(() => {
    if (trigger && !fired.current) {
      fired.current = true;
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff3cac", "#784ba0", "#2b86c5", "#ffd700", "#39ff14"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff3cac", "#784ba0", "#2b86c5", "#ffd700", "#39ff14"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();

      // Big burst
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ff3cac", "#784ba0", "#2b86c5", "#ffd700", "#39ff14"],
      });
    }
  }, [trigger]);

  return null;
}
