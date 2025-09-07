import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AlphabetGrid from "./components/AlphabetGrid";
import LetterPage from "./components/LetterPage";
import MatchGame from "./components/MatchGame";
import WordBuilderGame from "./components/WordBuilderGame";
import alphabet from "./data/alphabet";

export default function App() {
  const [view, setView] = useState("learn");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-center gap-4 p-4 bg-blue-500 text-white">
        <a href="/">📖 Учить буквы</a>
        <a href="/game/match">🎮 Пары</a>
        <a href="/game/build">🎮 Конструктор</a>
      </nav>

      <Router>
      <Routes>
        <Route path="/" element={<AlphabetGrid alphabet={alphabet} />} />
        <Route path="/game/match" element={<MatchGame alphabet={alphabet} />} />
        <Route path="/game/build" element={<WordBuilderGame alphabet={alphabet} />} />

        <Route path="/letter/:symbol" element={<LetterPage />} />
      </Routes>
    </Router>
    </div>
  );
}
