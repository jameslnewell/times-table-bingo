import { GameMode } from "../_hooks/useGame";
import Link from "next/link";

interface WaitingStateProps {
  mode: GameMode;
  delay: number;
  onDelayChange: (delay: number) => void;
  onModeChange: (mode: GameMode) => void;
  onPlay: () => void;
}

export function WaitingState({
  mode,
  delay,
  onPlay,
  onModeChange,
  onDelayChange,
}: WaitingStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8 max-w-md w-full">
      <div className="w-full space-y-6">
        {/* Mode Selection */}
        <div className="space-y-2">
          <label className="block text-xl font-semibold text-gray-700">
            Game Mode
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => onModeChange("multiplication")}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                mode === "multiplication"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Multiplication
            </button>
            <button
              onClick={() => onModeChange("division")}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                mode === "division"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Division
            </button>
          </div>
        </div>

        {/* Delay Selection */}
        <div className="space-y-2">
          <label className="block text-xl font-semibold text-gray-700">
            Speed: {delay / 1000}s
          </label>
          <input
            type="range"
            min="1000"
            max="5000"
            step="500"
            value={delay}
            onChange={(e) => onDelayChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Fast (1s)</span>
            <span>Slow (5s)</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={onPlay}
          className="text-4xl font-bold px-12 py-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
