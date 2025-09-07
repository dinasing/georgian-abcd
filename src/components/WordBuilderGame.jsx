import { useEffect, useState } from "react";
import speak from "../utils/speak";

export default function WordBuilderGame({ alphabet }) {
  const [wordData, setWordData] = useState(null);
  const [slots, setSlots] = useState([]);
  const [letters, setLetters] = useState([]);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const startNewWord = () => {
    const random = alphabet[Math.floor(Math.random() * alphabet.length)];
    const w = random.example.word.split("");
    setWordData(random.example);
    setSlots(Array(w.length).fill(null));
    setLetters([...w].sort(() => Math.random() - 0.5));
    setStatus(null);
  };

  const handleSlotClick = (index) => {
    const letter = slots[index];
    if (!letter) return;

    // очистить слот
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);

    // вернуть букву в доступные
    setLetters((prev) => [...prev, letter]);

    // если удалили — сбрасываем статус проверки
    setStatus(null);
  };

  useEffect(() => {
    startNewWord();
  }, [alphabet]);

  const handleLetterClick = (letter, index) => {
    const firstEmpty = slots.indexOf(null);
    if (firstEmpty === -1) return; // все слоты заняты

    const newSlots = [...slots];
    newSlots[firstEmpty] = letter;
    setSlots(newSlots);

    const newLetters = [...letters];
    newLetters.splice(index, 1);
    setLetters(newLetters);

    // если все слоты заполнены — проверяем
    if (newSlots.every((s) => s !== null)) {
      const assembled = newSlots.join("");
      if (assembled === wordData.word) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    }
  };

  const resetWord = () => {
    if (!wordData) return;
    const w = wordData.word.split("");
    setSlots(Array(w.length).fill(null));
    setLetters([...w].sort(() => Math.random() - 0.5));
    setStatus(null);
  };

  if (!wordData) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">✍️ Собери слово</h2>

      <p className="mb-4 text-center">
        <button onClick={() => speak(wordData.audio)}
            className="mt-2 px-3 py-1 bg-blue-400 text-white rounded-lg"
         >
            🔊 Слушать слово
        </button>
      </p>

      <p className="m-4 text-gray-600 text-center">
        Транскрипция: {wordData.transcription}
      </p>

    {/* Слоты */}
    <div className="flex justify-center gap-2 mb-6">
        {slots.map((s, i) => (
            <div
            key={i}
            onClick={() => handleSlotClick(i)}
            className={`w-10 h-12 border rounded-xl flex items-center justify-center text-2xl font-bold cursor-pointer
                ${status === "success" ? "bg-green-200" : ""}
                ${status === "error" ? "bg-red-200" : ""}
                ${s ? "hover:bg-yellow-100" : ""}`}
            title={s ? "Нажми, чтобы убрать букву" : ""}
            >
            {s || "_"}
            </div>
        ))}
    </div>

      {/* Кнопки букв */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {letters.map((l, i) => (
          <button
            key={i}
            onClick={() => handleLetterClick(l, i)}
            className="px-4 py-2 rounded-xl border bg-white hover:bg-gray-100 text-xl"
          >
            {l}
          </button>
        ))}
      </div>

      {/* Управление */}
      <div className="flex justify-center gap-4">
        {status === "error" && (
          <button
            onClick={resetWord}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
          >
            🔄 Попробовать снова
          </button>
        )}
        {status === "success" && (
          <button
            onClick={startNewWord}
            className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
          >
            ➡️ Следующее слово
          </button>
        )}
      </div>
    </div>
  );
}
