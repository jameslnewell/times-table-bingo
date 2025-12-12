"use client";

import { BingoSheet } from "../_components/BingoSheet";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "../_hooks/useLocalStorage";

const TIMES_TABLES_MAX = 12;
const MIN_GRID_SIZE = 4;
const MAX_GRID_SIZE = 12;

function generateAllPossibleAnswers(selectedTimesTables: number[]): number[] {
  const answers = new Set<number>();
  for (let i = 1; i <= TIMES_TABLES_MAX; i++) {
    for (let j = 1; j <= TIMES_TABLES_MAX; j++) {
      // Include answer if at least one of the numbers is in the selected times tables
      if (selectedTimesTables.includes(i) || selectedTimesTables.includes(j)) {
        answers.add(i * j);
      }
    }
  }
  return Array.from(answers);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateSheetAnswers(allAnswers: number[], cellsPerSheet: number): number[] {
  const shuffled = shuffleArray(allAnswers);
  return shuffled.slice(0, cellsPerSheet);
}

export default function SheetsPage() {
  const [selectedTimesTables] = useLocalStorage<number[]>(
    "times-table-bingo-selected-tables",
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  );
  const [gridSize, setGridSize] = useState(4);

  const cellsPerSheet = gridSize * gridSize;

  const sheets = useMemo(() => {
    const allAnswers = generateAllPossibleAnswers(selectedTimesTables);
    return [
      generateSheetAnswers(allAnswers, cellsPerSheet),
      generateSheetAnswers(allAnswers, cellsPerSheet),
      generateSheetAnswers(allAnswers, cellsPerSheet),
      generateSheetAnswers(allAnswers, cellsPerSheet),
    ];
  }, [selectedTimesTables, cellsPerSheet]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <h1 className="text-3xl font-bold">Math Bingo Sheets</h1>
          <div className="flex gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Print Sheets
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              Back to Game
            </Link>
          </div>
        </div>

        <div className="mb-6 print:hidden">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <label htmlFor="grid-size" className="block text-lg font-semibold mb-3">
              Grid Size: {gridSize} × {gridSize}
            </label>
            <input
              id="grid-size"
              type="range"
              min={MIN_GRID_SIZE}
              max={MAX_GRID_SIZE}
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{MIN_GRID_SIZE}×{MIN_GRID_SIZE}</span>
              <span>{MAX_GRID_SIZE}×{MAX_GRID_SIZE}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:gap-0 print:grid-cols-2">
          {sheets.map((answers, index) => (
            <div key={index} className="print:break-inside-avoid print:mb-8">
              <BingoSheet answers={answers} columns={gridSize} rows={gridSize} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
