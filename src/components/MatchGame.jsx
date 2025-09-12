import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { filterAlphabet, getLearnedNumber } from "../utils/progress";

export default function MatchGame({ alphabet }) {
  const [pairs, setPairs] = useState([]);
  const [russianColumn, setSimilarToColumn] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const { t } = useTranslation();
  const [onlyUnlearned, setOnlyUnlearned] = useState(true);

  const NUMBER_OF_LETTERS_PER_GAME = 6;

  const activeAlphabet = useMemo(() => {
    return filterAlphabet(alphabet, onlyUnlearned);
  }, [alphabet, onlyUnlearned, getLearnedNumber()]);

  const startNewGame = () => {
    if (activeAlphabet.length === 0) return;

    const shuffled = [...activeAlphabet].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, NUMBER_OF_LETTERS_PER_GAME);
    setPairs(chosen);

    setSimilarToColumn([...chosen].sort(() => Math.random() - 0.5));

    setSelected(null);
    setMatches([]);
    setStatus(null);
  };

  useEffect(() => {
    startNewGame();
  }, [activeAlphabet]);

  const handleClick = (type, value) => {
    if (!selected) {
      setSelected({ type, value });
    } else {
      if (selected.type !== type && selected.value.symbol === value.symbol) {
        setMatches((prev) => [...prev, value.symbol]);

        if (matches.length == NUMBER_OF_LETTERS_PER_GAME - 1) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      }
      setSelected(null);
    }
  };

  const learnedCount = useMemo(() => getLearnedNumber(), []);

  const alphabetSwitcher = useMemo(() => {
    if (learnedCount < 6) return null;

    return (
      <div className="mb-4 flex justify-center gap-2">
        <button
          onClick={() => setOnlyUnlearned(true)}
          className={`px-3 py-1 rounded-lg ${
            onlyUnlearned ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          { t("games.switcher_unlearned") }
        </button>
        <button
          onClick={() => setOnlyUnlearned(false)}
          className={`px-3 py-1 rounded-lg ${
            !onlyUnlearned ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          { t("games.switcher_all") }
        </button>
      </div>
    );
  }, [onlyUnlearned, learnedCount]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">🎮 {t("games.match_name")}</h2>
      </div>
      <p className="mb-4 text-gray-600">{t("games.match_description")}</p>

      { alphabetSwitcher }
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2 text-center">
            {t("games.georgian_letters")}
          </h3>
          {pairs.map((l, i) => (
            <button
              key={i}
              onClick={() => handleClick("ge", l)}
              className={`block w-full p-3 mb-2 rounded-xl border text-xl ${
                matches.includes(l.symbol)
                  ? "bg-green-300 cursor-default"
                  : selected?.type === "ge" &&
                    selected?.value.symbol === l.symbol
                  ? "bg-blue-200"
                  : "bg-white hover:bg-gray-100"
              }`}
              disabled={matches.includes(l.symbol)}
            >
              {l.symbol}
            </button>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-center">
            {t("games.equals")}
          </h3>
          {russianColumn.map((l, i) => (
            <button
              key={i}
              onClick={() => handleClick("ru", l)}
              className={`block w-full p-3 mb-2 rounded-xl border text-xl ${
                matches.includes(l.symbol)
                  ? "bg-green-300 cursor-default"
                  : selected?.type === "ru" &&
                    selected?.value.symbol === l.symbol
                  ? "bg-blue-200"
                  : "bg-white hover:bg-gray-100"
              }`}
              disabled={matches.includes(l.symbol)}
            >
              {l.sound}
            </button>
          ))}
        </div>
      </div>

      {status === "success" && (
        <button
          onClick={startNewGame}
          className="flex mt-4 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 m-auto"
        >
          🔄 {t("games.new_game")}
        </button>
      )}
    </div>
  );
}
