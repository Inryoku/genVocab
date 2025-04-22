// src/components/WordList.tsx

import React from "react";
import { WordData } from "../utils/tsvLoader";
import { WordItem } from "./WordItem";

type WordListProps = {
  words: WordData[];
};

export function WordList({ words }: WordListProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {words.map((item, index) => (
        <WordItem key={index} item={item} />
      ))}
    </div>
  );
}
