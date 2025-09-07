import { useState } from "react";

export default function MatchGame({ alphabet }) {
  const [selected, setSelected] = useState(null);
  const [matches, setMatches] = useState([]);

  const handleClick = (type, value) => {
    if (!selected) {
      setSelected({ type, value });
    } else {
      if (
        selected.type !== type &&
        selected.value.symbol === value.symbol
      ) {
        setMatches([...matches, value.symbol]);
      }
      setSelected(null);
    }
  };

  const shuffled = [...alphabet].sort(() => Math.random() - 0.5);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Игра: Сопоставь буквы</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Грузинские буквы</h3>
          {shuffled.map((l, i) => (
            <button
              key={i}
              onClick={() => handleClick("ge", l)}
              className={`block w-full p-3 mb-2 rounded-xl border ${
                matches.includes(l.symbol)
                  ? "bg-green-300"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {l.symbol}
            </button>
          ))}
        </div>
        <div>
          <h3 className="font-semibold mb-2">Русские аналоги</h3>
          {shuffled.map((l, i) => (
            <button
              key={i}
              onClick={() => handleClick("ru", l)}
              className={`block w-full p-3 mb-2 rounded-xl border ${
                matches.includes(l.symbol)
                  ? "bg-green-300"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {l.sound}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
