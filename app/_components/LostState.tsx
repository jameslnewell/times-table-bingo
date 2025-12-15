import { GameExpression, GameMode } from "../_hooks/useGame";

interface LostStateProps {
  mode: GameMode;
  expressions: GameExpression[];
  onPlayAgain: () => void;
}

export function LostState({ mode, expressions, onPlayAgain }: LostStateProps) {
  const getExpressionString = (expr: GameExpression) => {
    switch (mode) {
      case "multiplication":
        return `${expr.left} × ${expr.right} = ${expr.answer}`;
      case "division":
        return `${expr.left} ÷ ${expr.right} = ${expr.answer}`;
      case "addition":
        return `${expr.left} + ${expr.right} = ${expr.answer}`;
      case "subtraction":
        return `${expr.left} − ${expr.right} = ${expr.answer}`;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl">
      <div className="text-center mb-8">
        <h2 className="text-6xl font-bold text-orange-600 mb-4">Nice Try!</h2>
        <p className="text-2xl text-gray-600">
          All questions have been shown!
        </p>
      </div>
      <div className="w-full max-h-96 overflow-y-auto mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {expressions.map((expr, index) => (
            <div
              key={index}
              className="text-lg font-semibold text-center p-2 bg-white rounded border"
            >
              {getExpressionString(expr)}
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
