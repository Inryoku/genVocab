import React, { useState, useRef } from "react";
import { WordData } from "../utils/tsvLoader";
import { WordItem } from "./WordItem";

type WordListProps = {
  words: WordData[];
};

export function WordList({ words }: WordListProps) {
  const [minRating, setMinRating] = useState(0);
  const [ratingMode, setRatingMode] = useState<"min" | "exact">("min");
  const [firstLetter, setFirstLetter] = useState("");
  const [secondLetter, setSecondLetter] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 1文字目の候補
  const firstLetters = Array.from(
    new Set(words.map((w) => w.word[0]?.toLowerCase()))
  )
    .filter(Boolean)
    .sort();

  // 2文字目の候補（1文字目で絞り込み）
  const secondLetters = Array.from(
    new Set(
      words
        .filter((w) => !firstLetter || w.word[0]?.toLowerCase() === firstLetter)
        .map((w) => w.word[1]?.toLowerCase())
    )
  )
    .filter(Boolean)
    .sort();

  // フィルタリング
  const filteredWords = words
    .map((word, index) => ({
      word,
      index,
      rating: localStorage.getItem(`word-item-${word.word}-${index}`),
    }))
    .filter(({ word, rating }) => {
      const ratingValue = rating ? parseInt(rating, 10) : 0;
      const matchesRating =
        ratingMode === "min"
          ? ratingValue >= minRating
          : ratingValue === minRating;

      // 2段階フィルタ
      const w = word.word.toLowerCase();
      const matchesFirst = !firstLetter || w[0] === firstLetter;
      const matchesSecond = !secondLetter || w[1] === secondLetter;

      return matchesRating && matchesFirst && matchesSecond;
    });

  const handleTapOutside = () => {
    (inputRef.current as any)?.blur({ preventScroll: true });
  };

  console.log("Filtered Words:", filteredWords);

  return (
    <div className="max-w-3xl mx-auto">
      {/* フィルタリングUI */}
      <div className="mb-4">
        <label htmlFor="minRating" className="block text-sm font-medium">
          Rating Filter:
        </label>
        <select
          id="minRating"
          value={minRating}
          onChange={(e) => setMinRating(parseInt(e.target.value, 10))}
          className="dropdown2-link"
        >
          {[...Array(16)].map((_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <label className="ml-2">
          <input
            type="radio"
            name="ratingMode"
            checked={ratingMode === "min"}
            onChange={() => setRatingMode("min")}
            className="mr-1"
          />
          Minimum
        </label>
        <label className="ml-2">
          <input
            type="radio"
            name="ratingMode"
            checked={ratingMode === "exact"}
            onChange={() => setRatingMode("exact")}
            className="mr-1"
          />
          Exact
        </label>
      </div>

      <div className="mb-4 flex gap-2 items-end">
        <div>
          <label htmlFor="firstLetter" className="block text-sm font-medium">
            1st Letter:
          </label>
          <select
            id="firstLetter"
            value={firstLetter}
            onChange={(e) => {
              setFirstLetter(e.target.value);
              setSecondLetter(""); // 1文字目変更時は2文字目リセット
            }}
            className="dropdown2-link w-16"
          >
            <option value="">All</option>
            {firstLetters.map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="secondLetter" className="block text-sm font-medium">
            2nd Letter:
          </label>
          <select
            id="secondLetter"
            value={secondLetter}
            onChange={(e) => setSecondLetter(e.target.value)}
            className="dropdown2-link w-16"
            disabled={!firstLetter}
          >
            <option value="">All</option>
            {secondLetters.map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div onClick={handleTapOutside}>
        {/* フィルタリングされた単語を表示 */}
        {filteredWords.map(({ word, index }) => (
          <WordItem key={`${word.word}-${index}`} item={word} index={index} />
        ))}
      </div>
    </div>
  );
}
