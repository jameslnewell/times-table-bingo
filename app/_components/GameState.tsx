import { GameMode, GameStatus, GameExpression } from "../_hooks/useGame";
import { WaitingState } from "./WaitingState";
import { PlayingState } from "./PlayingState";
import { WonState } from "./WonState";
import { LostState } from "./LostState";

interface GameStateProps {
  status: GameStatus;
  mode: GameMode;
  delay: number;
  showAnswers: boolean;
  selectedTimesTables: number[];
  expressions: GameExpression[];
  onPlay: () => void;
  onModeChange: (mode: GameMode) => void;
  onDelayChange: (delay: number) => void;
  onShowAnswersChange: (value: boolean) => void;
  onSelectedTimesTablesChange: (selected: number[]) => void;
  onBingo: () => void;
  onReset: () => void;
  onPlayAgain: () => void;
}

export function GameState({
  status,
  mode,
  delay,
  showAnswers,
  selectedTimesTables,
  expressions,
  onPlay,
  onModeChange,
  onDelayChange,
  onShowAnswersChange,
  onSelectedTimesTablesChange,
  onBingo,
  onReset,
  onPlayAgain,
}: GameStateProps) {
  let content = null;

  if (status === "waiting") {
    content = (
      <WaitingState
        mode={mode}
        delay={delay}
        showAnswers={showAnswers}
        selectedTimesTables={selectedTimesTables}
        onPlay={onPlay}
        onModeChange={onModeChange}
        onDelayChange={onDelayChange}
        onShowAnswersChange={onShowAnswersChange}
        onSelectedTimesTablesChange={onSelectedTimesTablesChange}
      />
    );
  }

  if (status === "playing") {
    content = (
      <PlayingState
        mode={mode}
        showAnswers={showAnswers}
        expressions={expressions}
        onBingo={onBingo}
        onReset={onReset}
      />
    );
  }

  if (status === "won") {
    content = (
      <WonState
        mode={mode}
        expressions={expressions}
        onPlayAgain={onPlayAgain}
      />
    );
  }

  if (status === "lost") {
    content = (
      <LostState
        mode={mode}
        expressions={expressions}
        onPlayAgain={onPlayAgain}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <h1 className="absolute top-6 left-6 text-2xl font-bold z-10">
        <a
          href="https://jameslnewell.github.io/times-table-bingo"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Times Table Bingo
        </a>
      </h1>
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {content}
      </main>
    </div>
  );
}
