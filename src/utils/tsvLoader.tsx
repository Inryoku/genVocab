// src/utils/tsvLoader.ts

export type WordData = {
  word: string;
  meaning: string;
  example: string;
  example_ja: string;
};

export async function loadTSV(url: string): Promise<WordData[]> {
  const response = await fetch(url);
  const text = await response.text();

  const lines = text.trim().split("\n");
  const data: WordData[] = [];

  // 最初の行はヘッダーだからスキップ
  for (let i = 1; i < lines.length; i++) {
    const [word, meaning, example, example_ja] = lines[i].split("\t");

    if (word && meaning && example && example_ja) {
      data.push({
        word: word.trim(),
        meaning: meaning.trim(),
        example: example.trim(),
        example_ja: example_ja.trim(),
      });
    }
  }

  return data;
}
