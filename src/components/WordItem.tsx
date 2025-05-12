// src/components/WordItem.tsx

import React from "react";
import { WordData } from "../utils/tsvLoader";
import { useState, useEffect } from "react";

type WordItemProps = {
  item: WordData;
  index: number; // indexを受け取る
};

export function WordItem({ item, index }: WordItemProps) {
  // uniqueIdをitem.wordとindexを基に生成
  const uniqueId = `word-item-${item.word}-${index}`;
  const [rating, setRating] = useState<number>(() => {
    // 初期値をローカルストレージから取得
    const savedRating = localStorage.getItem(uniqueId);
    return savedRating ? parseInt(savedRating, 10) : 0;
  });
  const [isMeaningVisible, setIsMeaningVisible] = useState(false); // meaningの表示状態を管理

  // 評価が変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem(uniqueId, rating.toString());
  }, [rating, uniqueId]);

  const speak = (text: string) => {
    const synth = window.speechSynthesis;

    const speakNow = () => {
      const voices = synth.getVoices();
      const enVoice = voices.find((voice) => voice.lang.startsWith("en"));

      const utterance = new SpeechSynthesisUtterance(text);
      if (enVoice) {
        utterance.voice = enVoice;
      }
      utterance.lang = "en-US";
      synth.speak(utterance);
    };

    if (synth.getVoices().length === 0) {
      synth.onvoiceschanged = () => {
        speakNow();
      };
    } else {
      speakNow();
    }
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-bold flex items-center gap-2">
        {item.word}
        <button
          onClick={() => speak(item.word)}
          className="text-sm bg-gray-200 px-2 py-1 rounded"
        >
          🔊 Word
        </button>
      </h2>
      <p
        className={`mt-2 cursor-pointer text-gray-500 transition-all duration-300 ${
          isMeaningVisible
            ? "text-black opacity-100"
            : "text-black opacity-50 blur-sm"
        }`}
        onClick={() => setIsMeaningVisible(!isMeaningVisible)}
      >
        {item.meaning}
      </p>
      <div className="mt-2 flex items-center gap-2">
        <p>{item.example}</p>
        <button
          onClick={() => speak(item.example)}
          className="text-sm bg-gray-200 px-2 py-1 rounded"
        >
          🔊 Example
        </button>
      </div>
      <p className="mt-2">{item.example_ja}</p>
      <div className="mt-4">
        <p>Rating: {rating}/10</p>
        <span className="star-rating">
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <label
                htmlFor={`${uniqueId}-rate-${i + 1}`}
                style={{ "--i": i + 1 } as React.CSSProperties}
              >
                <i className="fa-solid fa-star"></i>
              </label>
              <input
                type="radio"
                name={`${uniqueId}-rating`}
                id={`${uniqueId}-rate-${i + 1}`}
                value={i + 1}
                checked={rating === i + 1}
                onChange={() => setRating(i + 1)}
              />
            </React.Fragment>
          ))}
        </span>
      </div>
    </div>
  );
}
