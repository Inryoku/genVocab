// src/components/WordItem.tsx

import { WordData } from "../utils/tsvLoader";

type WordItemProps = {
  item: WordData;
};

export function WordItem({ item }: WordItemProps) {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const enVoice = voices.find((voice) => voice.lang.startsWith("en"));

    if (enVoice) {
      utterance.voice = enVoice;
    }

    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
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
