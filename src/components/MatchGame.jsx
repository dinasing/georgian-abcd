import { useEffect, useState } from "react";

export default function MatchGame({ alphabet }) {
  const [pairs, setPairs] = useState([]);
  const [russianColumn, setRussianColumn] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState([]);

  const startNewGame = () => {
    const shuffled = [...alphabet].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, 6);
    setPairs(chosen);

    // перемешиваем русскую колонку один раз
    setRussianColumn([...chosen].sort(() => Math.random() - 0.5));

    setSelected(null);
    setMatches([]);
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
      }
      setSelected(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">🎮 Игра: Сопоставь буквы</h2>
        <button
          onClick={startNewGame}
          className="px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600"
        >
          🔄 Новая игра
        </button>
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
    </div>
  );
}
