import { useTranslation } from "react-i18next";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AlphabetGrid from "./components/AlphabetGrid";
import LetterPage from "./components/LetterPage";
import MatchGame from "./components/MatchGame";
import WordBuilderGame from "./components/WordBuilderGame";
import alphabet from "./utils/alphabet";

export default function App() {
  const { t, i18n } = useTranslation();
  const ALPHABET = alphabet();

  function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
      i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
    };

    return (
      <button onClick={toggleLanguage}>
        {i18n.language === "ru" ? "🇬🇧" : "🇷🇺"}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <nav className="flex justify-center gap-4 p-4 bg-blue-500 text-white">
        <LanguageSwitcher />
          <Link to={"/"}>{t("nav.learn")}</Link>
          <Link to={"/game/match"}>{t("nav.match")}</Link>
          <Link to="/game/build">{t("nav.build")}</Link>
        </nav>
      <Routes>
        <Route path="/" element={<AlphabetGrid alphabet={ALPHABET} />} />
        <Route path="/game/match" element={<MatchGame alphabet={ALPHABET} />} />
        <Route path="/game/build" element={<WordBuilderGame alphabet={ALPHABET} />} />
        <Route path="/letter/:symbol" element={<LetterPage alphabet={ALPHABET} />} />
      </Routes>
    </Router>
    </div>
  );
}
