import { GameExpression, GameMode } from "../_hooks/useGame";

interface PlayingStateProps {
  mode: GameMode;
  showAnswers: boolean;
  expressions: GameExpression[];
  onBingo: () => void;
  onReset: () => void;
}

export function PlayingState({ mode, showAnswers, expressions, onBingo, onReset }: PlayingStateProps) {
  const isNewest = (index: number) => index === expressions.length - 1;

  const getOperator = () => {
    switch (mode) {
      case "multiplication":
        return "×";
      case "division":
        return "÷";
      case "addition":
        return "+";
      case "subtraction":
        return "−";
      default:
        return "×";
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl flex-1 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4">
          {expressions.map((expr, index) => (
            <div
              key={index}
              className={`font-bold text-center py-4 transition-all ${
                isNewest(index) ? "text-7xl" : "text-5xl opacity-70"
              }`}
            >
              {`${expr.left} ${getOperator()} ${expr.right}`}
              {showAnswers && (
                <span className="text-gray-400 ml-4">= {expr.answer}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 mt-8">
        <button
          onClick={onBingo}
          className="text-4xl font-bold px-12 py-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Bingo!
        </button>
        <button
          onClick={onReset}
          className="px-4 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          Exit
        </button>
      </div>
    </>
  );
}
