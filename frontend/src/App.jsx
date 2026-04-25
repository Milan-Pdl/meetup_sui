import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Landing from "./scenes/Landing";
import WhoAreYou from "./scenes/WhoAreYou";
import InterestTrap from "./scenes/InterestTrap";
import Questions from "./scenes/Questions";
import Finale from "./scenes/Finale";

const API = "http://localhost:8000";

const INITIAL_ANSWERS = {
  name: "",
  gender: "",
  favorite_food: "",
  favorite_drink: "",
  had_divorce: false,
};

export default function App() {
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axios.get(`${API}/api/photos`);
        if (res.data.photos) {
          setPhotos(res.data.photos);
        }
      } catch (e) {
        console.error("Failed to fetch photos", e);
      }
    };
    fetchPhotos();
  }, []);

  const updateAnswers = (partial) => {
    setAnswers((prev) => ({ ...prev, ...partial }));
  };

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1a1a2e",
            color: "#f0f0f5",
            border: "1px solid rgba(255,60,172,0.3)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.95rem",
            maxWidth: "400px",
          },
          error: {
            style: {
              background: "#1a0010",
              border: "1px solid rgba(255,60,172,0.5)",
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Landing photos={photos} />} />
        <Route
          path="/who-are-you"
          element={<WhoAreYou onUpdate={updateAnswers} photos={photos} />}
        />
        <Route path="/interested" element={<InterestTrap photos={photos} />} />
        <Route
          path="/questions"
          element={<Questions onUpdate={updateAnswers} answers={answers} photos={photos} />}
        />
        <Route
          path="/finale"
          element={<Finale answers={answers} photos={photos} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
