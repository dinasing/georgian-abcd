import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AlphabetGrid from "./components/AlphabetGrid";
import LetterPage from "./components/LetterPage";
import MatchGame from "./components/MatchGame";
import WordBuilderGame from "./components/WordBuilderGame";
import alphabet from "./data/alphabet";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <nav className="flex justify-center gap-4 p-4 bg-blue-500 text-white">
          <Link to={"/"}>📖 Учить буквы</Link>
          <Link to={"/game/match"}>🎮 Пары</Link>
          <Link to="/game/build">🎮 Конструктор</Link>
        </nav>
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
