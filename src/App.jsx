import { useState } from "react";
import AlphabetGrid from "./components/AlphabetGrid";
import MatchGame from "./components/MatchGame";
import alphabet from "./data/alphabet";

export default function App() {
  const [view, setView] = useState("learn");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex justify-center gap-4 p-4 bg-blue-600 text-white">
        <button onClick={() => setView("learn")}>📖 Учить буквы</button>
        <button onClick={() => setView("game")}>🎮 Игра</button>
      </nav>

      {view === "learn" && <AlphabetGrid alphabet={alphabet} />}
      {view === "game" && <MatchGame alphabet={alphabet} />}
    </div>
  );
}
