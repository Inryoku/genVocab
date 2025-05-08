import React from "react";

export function ExportCSVButton() {
  const exportToCSV = () => {
    const keys = Object.keys(localStorage);
    const csvData: string[] = ["Word,Rating"]; // CSVのヘッダー

    keys.forEach((key) => {
      if (key.startsWith("word-item-")) {
        const word = key.replace("word-item-", ""); // "word-item-"を削除して単語を取得
        const rating = localStorage.getItem(key) || "0"; // 評価を取得
        csvData.push(`${word},${rating}`); // CSV形式で追加
      }
    });

    // CSV文字列を生成
    const csvContent = csvData.join("\n");

    // Blobを作成してダウンロード
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ratings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportToCSV}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Export to CSV
    </button>
  );
}
