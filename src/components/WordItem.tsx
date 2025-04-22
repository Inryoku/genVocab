// src/components/WordItem.tsx

import React from "react";
import { WordData } from "../utils/tsvLoader";

type WordItemProps = {
  item: WordData;
};

export function WordItem({ item }: WordItemProps) {
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
      // まだボイス読み込み終わってないなら、onvoiceschanged待つ
      synth.onvoiceschanged = speakNow;
    } else {
      // もうボイスあるなら即発話
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
      <p className="mt-1">{item.meaning}</p>
      <div className="mt-2 flex items-center gap-2">
        <p>{item.example}</p>
        <button
          onClick={() => speak(item.example)}
          className="text-sm bg-gray-200 px-2 py-1 rounded"
        >
          🔊 Example
        </button>
      </div>
      <p className="mt-1 text-gray-500">{item.example_ja}</p>
    </div>
  );
}
