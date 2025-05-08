import React, { useState } from "react";
import { WordData } from "../utils/tsvLoader";
import { WordItem } from "./WordItem";

type WordListProps = {
  words: WordData[];
};

export function WordList({ words }: WordListProps) {
  const [minRating, setMinRating] = useState(0); // 最低評価を管理
  const [filterLetter, setFilterLetter] = useState(""); // アルファベットフィルタを管理

  // ローカルストレージから評価を取得してフィルタリング
  const filteredWords = words.filter((word) => {
    const uniqueId = `word-item-${word.word}`;
    const savedRating = localStorage.getItem(uniqueId);
    const rating = savedRating ? parseInt(savedRating, 10) : 0;

    // 最低評価とアルファベットフィルタを適用
    const matchesRating = rating >= minRating;
    const matchesLetter =
      filterLetter === "" ||
      word.word.toLowerCase().startsWith(filterLetter.toLowerCase());

    return matchesRating && matchesLetter;
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* フィルタリングUI */}
      <div className="mb-4">
        <label htmlFor="minRating" className="block text-sm font-medium">
          Minimum Rating:
        </label>
        <select
          id="minRating"
          value={minRating}
          onChange={(e) => setMinRating(parseInt(e.target.value, 10))}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          {[...Array(11)].map((_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="filterLetter" className="block text-sm font-medium">
          Filter by First Letter:
        </label>
        <input
          id="filterLetter"
          type="text"
          value={filterLetter}
          onChange={(e) => setFilterLetter(e.target.value)}
          maxLength={1} // 1文字だけ入力可能
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          placeholder="Enter a letter"
        />
      </div>

      {/* フィルタリングされた単語を表示 */}
      {filteredWords.map((item, index) => (
        <WordItem key={`${item.word}-${index}`} item={item} index={index} />
      ))}
    </div>
  );
}
