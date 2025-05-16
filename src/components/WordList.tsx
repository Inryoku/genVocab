import React, { useState, useRef } from "react";
import { WordData } from "../utils/tsvLoader";
import { WordItem } from "./WordItem";

type WordListProps = {
  words: WordData[];
};

export function WordList({ words }: WordListProps) {
  const [minRating, setMinRating] = useState(0); // 最低評価を管理
  const [filterLetter, setFilterLetter] = useState(""); // アルファベットフィルタを管理
  const inputRef = useRef<HTMLInputElement>(null);

  // ローカルストレージから評価を取得してフィルタリング
  const filteredWords = words
    .map((word, index) => ({
      word,
      index,
      rating: localStorage.getItem(`word-item-${word.word}-${index}`),
    }))
    .filter(({ word, rating }) => {
      const ratingValue = rating ? parseInt(rating, 10) : 0;

      // 最低評価とアルファベットフィルタを適用
      const matchesRating = ratingValue >= minRating;
      const matchesLetter =
        filterLetter === "" ||
        word.word.toLowerCase().startsWith(filterLetter.toLowerCase());

      return matchesRating && matchesLetter;
    });

  const handleTapOutside = () => {
    inputRef.current?.blur();
  };

  console.log("Filtered Words:", filteredWords);

  return (
    <div onClick={handleTapOutside} className="max-w-3xl mx-auto">
      {/* フィルタリングUI */}
      <div className="mb-4">
        <label htmlFor="minRating" className="block text-sm font-medium">
          Minimum Rating:
        </label>
        <select
          id="minRating"
          value={minRating}
          onChange={(e) => setMinRating(parseInt(e.target.value, 10))}
          className="dropdown2-link"
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
          Filter by First Two Letter:
        </label>
        <input
          id="filterLetter"
          type="text"
          ref={inputRef}
          value={filterLetter}
          onChange={(e) => setFilterLetter(e.target.value)}
          maxLength={2} // 2文字だけ入力可能
          className="input8 pl-3 w-12"
        />
      </div>

      {/* フィルタリングされた単語を表示 */}
      {filteredWords.map(({ word, index }) => (
        <WordItem key={`${word.word}-${index}`} item={word} index={index} />
      ))}
    </div>
  );
}
