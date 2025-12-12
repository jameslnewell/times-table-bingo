import { GameExpression } from "../_hooks/useGame";

interface WonStateProps {
  expressions: GameExpression[];
  onPlayAgain: () => void;
}

export function WonState({ expressions, onPlayAgain }: WonStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl">
      <div className="text-center mb-8">
        <h2 className="text-6xl font-bold text-green-600 mb-4">
          Congratulations!
        </h2>
        <p className="text-2xl text-gray-600">You won the game!</p>
      </div>
      <div className="w-full max-h-96 overflow-y-auto mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {expressions.map((expr, index) => (
            <div
              key={index}
              className="text-lg font-semibold text-center p-2 bg-white rounded border"
            >
              {expr.mode === "multiplication"
                ? `${expr.left} × ${expr.right} = ${expr.answer}`
                : `${expr.left} ÷ ${expr.right} = ${expr.answer}`}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onPlayAgain}
        className="text-2xl font-bold px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Play Again
      </button>
    </div>
  );
}
