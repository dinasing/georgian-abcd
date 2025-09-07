import { useState } from "react";
import { Link } from "react-router-dom";
import speak from "../utils/speak";

export default function LetterCard({ letter }) {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
      <Link
        to={`/letter/${letter.symbol}`}
        className="mt-2 block px-3 py-1 rounded-lg"
      >
        <h2 className="text-6xl font-bold mb-4">{letter.symbol}</h2>
      </Link>

      <p className="text-xl">Похоже на русскую: {letter.sound}</p>

      <button
        onClick={() => setShowExample(!showExample)}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-xl"
      >
        {showExample ? "Скрыть пример" : "Показать пример"}
      </button>

      {showExample && (
        <div className="mt-4">
          <p className="text-2xl">{letter.example.word}</p>
          <p className="text-gray-600">{letter.example.transcription}</p>
          <p className="italic">{letter.example.translation}</p>
          <button
            onClick={() => speak(letter.example.audio)}
            className="mt-2 px-3 py-1 bg-blue-400 text-white rounded-lg"
          >
            🔊 Слушать слово
          </button>
        </div>
      )}
     </div>
  );
}
