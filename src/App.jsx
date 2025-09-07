import { useState } from "react";
import AlphabetGrid from "./components/AlphabetGrid";
import MatchGame from "./components/MatchGame";
import WordBuilderGame from "./components/WordBuilderGame";
import alphabet from "./data/alphabet";

export default function App() {
  const [view, setView] = useState("learn");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-center gap-4 p-4 bg-blue-600 text-white">
        <button onClick={() => setView("learn")}>📖 Учить буквы</button>
        <button onClick={() => setView("game_match")}>🎮 Пары</button>
        <button onClick={() => setView("game_builder")}>🎮 Конструктор</button>
      </nav>

      {view === "learn" && <AlphabetGrid alphabet={alphabet} />}
      {view === "game_match" && <MatchGame alphabet={alphabet} />}
      {view === "game_builder" && <WordBuilderGame alphabet={alphabet} />}
    </div>
  );
}
