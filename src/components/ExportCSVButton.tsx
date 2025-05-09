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
      className="w-28 h-10 text-white cursor-pointor text-base font-bold
      text-center outline-none border-none relative rounded-[10px] bg-[#0c0c0c]
      hover:bg-[#2b2bff] hover:top-0.5 transition-all duration-300 ease-in-out shadow-inner"
    >
      Export to CSV
    </button>
  );
}
