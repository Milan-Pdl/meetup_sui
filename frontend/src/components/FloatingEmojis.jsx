import React from "react";

const EMOJIS = ["🎉","🔥","💥","😎","🤪","🍕","🎊","⚡","💫","🌈","🦄","🎸","🍹","🎭","🤘"];

export default function FloatingEmojis() {
  return (
    <div className="floating-emojis" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => {
        const emoji = EMOJIS[i % EMOJIS.length];
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const duration = 10 + Math.random() * 14;
        return (
          <span
            key={i}
            className="float-emoji"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              fontSize: `${1.2 + Math.random() * 1.8}rem`,
            }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}
