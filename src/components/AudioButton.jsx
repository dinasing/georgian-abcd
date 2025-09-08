import { useEffect, useState } from "react";

export default function AudioButton({ src, label = "Слушать", autoPlay = false }) {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (src) {
      const audio = new Audio(src);
      setAudio(audio);

      if (autoPlay) {
        // подождём чуть, чтобы браузер успел загрузить
        setTimeout(() => {
          audio.play().catch(() => {
            // браузеры иногда блокируют авто-плей без клика
            console.warn("Автовоспроизведение заблокировано браузером");
          });
        }, 300);
      }
    }
  }, [src, autoPlay]);

  const play = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <button
      onClick={play}
      disabled={!src}
      className="mt-2 px-3 py-1 bg-blue-400 text-white rounded-lg disabled:opacity-50"
    >
      🔊 {label}
    </button>
  );
}
