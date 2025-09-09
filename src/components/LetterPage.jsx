import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import AudioButton from "./AudioButton";

export default function LetterPage({ alphabet }) {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const index = alphabet.findIndex((l) => l.symbol === symbol);
  const letter = alphabet[index];

  if (!letter) {
    return (
      <div className="p-6">
        <p>{ t("letter.not_found")}</p>
        <Link to="/" className="text-blue-500 underline">
          {t("letter.back_home")}
        </Link>
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
        <Link to="/" className="text-blue-500 underline">
          {t("letter.back_home")}
        </Link>

        <div className="flex gap-2">
          {prev && (
            <button
              onClick={() => navigate(`/letter/${prev}`)}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              {t("letter.prev")}
            </button>
          )}
          {next && (
            <button
              onClick={() => navigate(`/letter/${next}`)}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              {t("letter.next")}
            </button>
          )}
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4">{letter.symbol}</h1>
      <p className="text-xl mb-2">{ t("letter.similar") }: {letter.sound}</p>

      <div className="mb-4">
        <p>{ t("letter.example") }: <strong>{letter.example.word}</strong>
        </p>
        <p>{t("letter.transcription") }: {letter.example.transcription}</p>
        <p>{ t("letter.translation") }: {letter.example.translation}</p>
        <AudioButton src={letter.example.audio} />
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">
            { t("letter.related_words") }
          </h2>
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
