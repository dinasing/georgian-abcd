import { useState } from "react";

export default function LetterCard({ letter }) {
  const [showExample, setShowExample] = useState(false);

  const speak = (text, lang = "ka-GE") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
      <h1 className="text-6xl font-bold mb-4">{letter.symbol}</h1>
      <button
        onClick={() => speak(letter.symbol)}
        className="px-4 py-2 bg-blue-500 text-white rounded-xl mb-4"
      >
        🔊 Слушать букву
      </button>
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
            onClick={() => speak(letter.example.word)}
            className="mt-2 px-3 py-1 bg-blue-400 text-white rounded-lg"
          >
            🔊 Слушать слово
          </button>
        </div>
      )}
    </div>
  );
}
