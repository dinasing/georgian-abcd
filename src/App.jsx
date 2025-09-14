import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AlphabetGrid from "./components/AlphabetGrid";
import DrawLetterGame from "./components/DrawLetterGame";
import LetterPage from "./components/LetterPage";
import MatchGame from "./components/MatchGame";
import Navigation from "./components/Navigation";
import WordBuilderGame from "./components/WordBuilderGame";
import alphabet from "./utils/alphabet";

export default function App() {
  const ALPHABET = alphabet();

  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
      < Navigation />
      <Routes>
        <Route path="/" element={<AlphabetGrid alphabet={ALPHABET} />} />
        <Route path="/game/match" element={<MatchGame alphabet={ALPHABET} />} />
        <Route path="/game/build" element={<WordBuilderGame alphabet={ALPHABET} />} />
        <Route path="/game/draw" element={<DrawLetterGame alphabet={ALPHABET} />} />
        <Route path="/letter/:symbol" element={<LetterPage alphabet={ALPHABET} />} />
      </Routes>
    </Router>
    </div>
  );
}
