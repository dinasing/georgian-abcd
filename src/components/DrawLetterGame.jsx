import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import Stars from "./Stars";

export default function DrawLetterGame({ alphabet }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(' ');
  const [opacity, setOpacity] = useState(0.6);
  const [result, setResult] = useState(null); // { recall, precision, f1 }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "black";
    ctxRef.current = ctx;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const random = alphabet[Math.floor(Math.random() * alphabet.length)];
    setCurrentLetter(random);
  }, [alphabet]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
      ctxRef.current.fillStyle = "white";
      ctxRef.current.fillRect(0, 0, canvas.width, canvas.height);
      ctxRef.current.strokeStyle = "black";
    }
    setResult(null);
  };

  const startNewLetter = () => {
    const random = alphabet[Math.floor(Math.random() * alphabet.length)];
    setCurrentLetter(random);
    clearCanvas();
    setResult(null);
  };

  const startDrawing = (e) => {
    if (!ctxRef.current) return;
    setIsDrawing(true);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing || !ctxRef.current) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!ctxRef.current) return;
    setIsDrawing(false);
    ctxRef.current.closePath();
  };

  const imageDataToMask = (imageData, alphaThreshold = 10, luminanceThreshold = 128) => {
    const { data, width, height } = imageData;
    const mask = new Uint8Array(width * height);
    let idx = 0;
    for (let i = 0; i < data.length; i += 4, idx++) {
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      if (a < alphaThreshold) {
        mask[idx] = 0;
        continue;
      }
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      mask[idx] = lum < luminanceThreshold ? 1 : 0;
    }
    return { mask, width, height };
  };

  const compareWithTemplate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current || !currentLetter) return;

    const w = canvas.width;
    const h = canvas.height;
    const userData = ctxRef.current.getImageData(0, 0, w, h);

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tctx = tempCanvas.getContext("2d");
    tctx.fillStyle = "white";
    tctx.fillRect(0, 0, w, h);

    tctx.fillStyle = "black";
    const fontSize = '8rem';
    tctx.font = `${fontSize} ui-sans-serif`;
    tctx.textAlign = "center";
    tctx.textBaseline = "middle";
    tctx.fillText(currentLetter.symbol, w / 2, h / 2);

    const templateData = tctx.getImageData(0, 0, w, h);

    const { mask: userMask } = imageDataToMask(userData, 10, 128);
    const { mask: tmplMask } = imageDataToMask(templateData, 10, 128);

    let templateCount = 0;
    let intersection = 0;
    let userCount = 0;

    for (let i = 0; i < tmplMask.length; i++) {
      if (tmplMask[i]) {
        templateCount++;
        if (userMask[i]) intersection++;
      }
      if (userMask[i]) userCount++;
    }

    const recall = templateCount ? intersection / templateCount : 0;
    const precision = userCount ? intersection / userCount : 0;
    const f1 = (precision + recall) ? (2 * precision * recall) / (precision + recall) : 0;

    setResult({
      recall: +(recall * 100).toFixed(1),
      precision: +(precision * 100).toFixed(1),
      f1: +(f1 * 100).toFixed(1),
    });
  };

  return (
    <div className="p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold">🧩 {t("games.canvas_name")}</h2>

      <p className="mb-2 text-gray-600">
        {t("games.canvas_description")}: <span className="text-3xl">{currentLetter.symbol}</span>
      </p>

      <div className="relative mb-4">
        <div
          className="mb-[32px] absolute inset-0 flex items-center justify-center text-9xl text-gray-300 pointer-events-none"
          style={{ opacity }}
        >
          {currentLetter.symbol}
        </div>

        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="border rounded-xl bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            const rect = e.target.getBoundingClientRect();
            startDrawing({
              nativeEvent: {
                offsetX: touch.clientX - rect.left,
                offsetY: touch.clientY - rect.top,
              },
            });
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            const rect = e.target.getBoundingClientRect();
            draw({
              nativeEvent: {
                offsetX: touch.clientX - rect.left,
                offsetY: touch.clientY - rect.top,
              },
            });
          }}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="mb-4 w-64">
        <label className="block text-gray-700 text-sm mb-1">
          { t("games.canvas.opacity")}: {(opacity * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <button onClick={clearCanvas} className="px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600">
          { t("games.canvas.clear")}
        </button>
        <button onClick={startNewLetter} className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600">
          { t("games.canvas.next")}
        </button>
        <button onClick={compareWithTemplate} className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600">
          { t("games.canvas.check")}
        </button>
      </div>

      {result && <Stars f1={result.f1} /> }
    </div>
  );
}
