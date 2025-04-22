// src/App.tsx

import { useEffect, useState } from "react";
import { loadTSV, WordData } from "./utils/tsvLoader";
import { WordList } from "./components/WordList";
import React from "react";

export default function App() {
  const [words, setWords] = useState<WordData[]>([]);

  useEffect(() => {
    loadTSV("words.tsv").then(setWords);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Word Reader</h1>
      <WordList words={words} />
    </div>
  );
}
