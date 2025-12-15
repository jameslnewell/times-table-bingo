import { GameMode } from "../_hooks/useGame";
import Link from "next/link";

interface WaitingStateProps {
  mode: GameMode;
  delay: number;
  showAnswers: boolean;
  allowDuplicateAnswers: boolean;
  selectedTimesTables: number[];
  onDelayChange: (delay: number) => void;
  onModeChange: (mode: GameMode) => void;
  onShowAnswersChange: (value: boolean) => void;
  onAllowDuplicateAnswersChange: (value: boolean) => void;
  onSelectedTimesTablesChange: (selected: number[]) => void;
  onPlay: () => void;
}

export function WaitingState({
  mode,
  delay,
  showAnswers,
  allowDuplicateAnswers,
  selectedTimesTables,
  onPlay,
  onModeChange,
  onDelayChange,
  onShowAnswersChange,
  onAllowDuplicateAnswersChange,
  onSelectedTimesTablesChange,
}: WaitingStateProps) {
  const toggleTimesTable = (num: number) => {
    if (selectedTimesTables.includes(num)) {
      onSelectedTimesTablesChange(selectedTimesTables.filter((n) => n !== num));
    } else {
      onSelectedTimesTablesChange([...selectedTimesTables, num].sort((a, b) => a - b));
    }
  };
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 max-w-md w-full">
      <div className="w-full space-y-6">
        {/* Mode Selection */}
        <div className="space-y-2">
          <label className="block text-xl font-semibold text-gray-700">
            Game Mode
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onModeChange("multiplication")}
              className={`py-3 px-6 rounded-lg font-semibold transition-colors ${
                mode === "multiplication"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Multiplication
            </button>
            <button
              onClick={() => onModeChange("division")}
              className={`py-3 px-6 rounded-lg font-semibold transition-colors ${
                mode === "division"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Division
            </button>
            <button
              onClick={() => onModeChange("addition")}
              className={`py-3 px-6 rounded-lg font-semibold transition-colors ${
                mode === "addition"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Addition
            </button>
            <button
              onClick={() => onModeChange("subtraction")}
              className={`py-3 px-6 rounded-lg font-semibold transition-colors ${
                mode === "subtraction"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Subtraction
            </button>
          </div>
        </div>

        {/* Times Tables Selection */}
        <div className="space-y-2">
          <label className="block text-xl font-semibold text-gray-700">
            Times Tables
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <button
                key={num}
                onClick={() => toggleTimesTable(num)}
                className={`py-2 px-3 rounded-lg font-semibold transition-colors ${
                  selectedTimesTables.includes(num)
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-400 hover:bg-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Show Answers Toggle */}
        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xl font-semibold text-gray-700">
              Show Answers
            </span>
            <input
              type="checkbox"
              checked={showAnswers}
              onChange={(e) => onShowAnswersChange(e.target.checked)}
              className="w-6 h-6 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
          </label>
        </div>

        {/* Allow Duplicate Answers Toggle */}
        <div className="space-y-2">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xl font-semibold text-gray-700">
              Allow Duplicate Answers
            </span>
            <input
              type="checkbox"
              checked={allowDuplicateAnswers}
              onChange={(e) => onAllowDuplicateAnswersChange(e.target.checked)}
              className="w-6 h-6 text-blue-600 bg-gray-200 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {/* Delay Selection */}
        <div className="space-y-2">
          <label className="block text-xl font-semibold text-gray-700">
            Speed: {delay / 1000}s
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="500"
            value={delay}
            onChange={(e) => onDelayChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Fast (1s)</span>
            <span>Slow (10s)</span>
          </div>
        </div>

        <button
          onClick={onPlay}
          disabled={selectedTimesTables.length === 0}
          className="text-4xl font-bold px-12 py-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          Play Now
        </button>
        <Link
          href="/sheets"
          className="text-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
        >
          Print Bingo Sheets
        </Link>
      </div>
    </div>
  );
}
