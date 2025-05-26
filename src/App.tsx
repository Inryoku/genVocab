// src/App.tsx

import { useEffect, useState } from "react";
import { loadTSV, WordData } from "./utils/tsvLoader";
import { WordList } from "./components/WordList";
import { ExportCSVButton } from "./components/ExportCSVButton";
import React from "react";

export default function App() {
  const [words, setWords] = useState<WordData[]>([]);

  useEffect(() => {
    console.log("Available voices:", window.speechSynthesis.getVoices());
  }, []);

  useEffect(() => {
    loadTSV("words.tsv").then(setWords);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📖Word Reader</h1>
      <p className="mb-4 text-zinc-400">Ver. 1.4</p>
      <ExportCSVButton />
      <WordList words={words} />
    </div>
  );
}
