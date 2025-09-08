import { useEffect, useState } from "react";

export default function MatchGame({ alphabet }) {
  const [pairs, setPairs] = useState([]);
  const [russianColumn, setRussianColumn] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState([]);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const NUMBER_OF_LETTERS_PER_GAME = 6;

  const startNewGame = () => {
    const shuffled = [...alphabet].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, NUMBER_OF_LETTERS_PER_GAME);
    setPairs(chosen);

    // перемешиваем русскую колонку один раз
    setRussianColumn([...chosen].sort(() => Math.random() - 0.5));

    setSelected(null);
    setMatches([]);
    setStatus(null);
  };

  useEffect(() => {
    startNewGame();
  }, [alphabet]);

  const handleClick = (type, value) => {
    if (!selected) {
      setSelected({ type, value });
    } else {
      if (
        selected.type !== type &&
        selected.value.symbol === value.symbol
      ) {
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">🎮 Игра: Сопоставь буквы</h2>
      </div>
      <p className="mb-4 text-gray-600">
        Соедини грузинскую букву с её русским аналогом
      </p>

      <div className="grid grid-cols-2 gap-6">
        {/* Левая колонка: грузинские буквы */}
        <div>
          <h3 className="font-semibold mb-2 text-center">Грузинские буквы</h3>
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

        {/* Правая колонка: русские аналоги */}
        <div>
          <h3 className="font-semibold mb-2 text-center">Русские аналоги</h3>
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
          🔄 Новая игра
        </button>
        )}
    </div>
  );
}
