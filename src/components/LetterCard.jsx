import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { isLearned } from "../utils/progress";
import AudioButton from "./AudioButton";

export default function LetterCard({ letter }) {
  const [showExample, setShowExample] = useState(false);
  const { t } = useTranslation();
  const learned = isLearned(letter.symbol);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
      <Link
        to={`/letter/${letter.symbol}`}
        className="mt-2 block px-3 py-1 rounded-lg"
      >
        <h2 className="text-6xl font-bold mb-4">{letter.symbol} {learned &&
          <span className="text-green-600 text-xl align-middle">✅</span>}
        </h2>
      </Link>
      <p className="text-xl">
        {t("letter.similar")} <i>{letter.sound}</i>
      </p>

      <button
        onClick={() => setShowExample(!showExample)}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-xl"
      >
        {showExample ? t("letter.hide_example") : t("letter.show_example")}
      </button>

      {showExample && (
        <div className="mt-4">
          <p className="text-2xl">{letter.example.word}</p>
          <p className="text-gray-600">{letter.example.transcription}</p>
          <p className="italic">{letter.example.translation}</p>
          <AudioButton src={letter.example.audio} />
        </div>
      )}
    </div>
  );
}
