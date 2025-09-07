import { Link, useNavigate, useParams } from "react-router-dom";
import alphabet from "../data/alphabet";
import speak from "../utils/speak";

export default function LetterPage() {
  const { symbol } = useParams();
  const navigate = useNavigate();

  const index = alphabet.findIndex((l) => l.symbol === symbol);
  const letter = alphabet[index];

  if (!letter) {
    return (
      <div className="p-6">
        <p>Буква не найдена</p>
        <Link to="/" className="text-blue-500 underline">⬅️ На главную</Link>
      </div>
    );
  }

  // найти все слова, где встречается эта буква
  const related = alphabet.filter(
    (l) => l.example.word.includes(symbol) && l.symbol !== symbol
  );

  // навигация
  const prev = index > 0 ? alphabet[index - 1].symbol : null;
  const next = index < alphabet.length - 1 ? alphabet[index + 1].symbol : null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="text-blue-500 underline">⬅️ На главную</Link>

        <div className="flex gap-2">
          {prev && (
            <button
              onClick={() => navigate(`/letter/${prev}`)}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              ⏮️ Предыдущая
            </button>
          )}
          {next && (
            <button
              onClick={() => navigate(`/letter/${next}`)}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Следующая ⏭️
            </button>
          )}
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4">{letter.symbol}</h1>
      <p className="text-xl mb-2">Звук: {letter.sound}</p>

      <div className="mb-4">
        <p>Пример: <strong>{letter.example.word}</strong></p>
        <p>Транскрипция: {letter.example.transcription}</p>
        <p>Перевод: {letter.example.translation}</p>
        {letter.example.audio && (
          <button
            onClick={() => speak(letter.example.audio)}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg"
          >
            🔊 Слушать
          </button>
        )}
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Слова с этой буквой</h2>
          <ul className="list-disc pl-5">
            {related.map((r, i) => (
              <li key={i}>
                {r.example.word} — {r.example.translation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}