import * as React from "react";

export type GameMode = "multiplication" | "division";
export type GameStatus = "waiting" | "playing" | "won" | "lost";

export interface GameExpression {
  left: number;
  right: number;
  answer: number;
}

export interface GameConfig {
  mode?: GameMode;
  delay?: number;
}

export interface GameState {
  status: GameStatus;
  expressions: GameExpression[];
}

const TIMES_TABLES_MAX = 12;

function generateExpression(
  mode: GameMode,
  usedAnswers: Set<number>
): GameExpression | null {
  const maxAttempts = 100;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const left = Math.floor(Math.random() * TIMES_TABLES_MAX) + 1;
    const right = Math.floor(Math.random() * TIMES_TABLES_MAX) + 1;
    const answer = left * right;

    if (!usedAnswers.has(answer)) {
      return {
        left: mode === "multiplication" ? left : answer,
        right,
        answer: mode === "multiplication" ? answer : left,
      };
    }

    attempts++;
  }

  return null;
}

export function useGame(config: GameConfig = {}) {
  const { delay = 3000, mode = "multiplication" } = config;

  const [status, setStatus] = React.useState<GameStatus>("waiting");
  const [expressions, setExpressions] = React.useState<GameExpression[]>([]);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const usedAnswers = React.useMemo(() => {
    return new Set(expressions.map((expr) => expr.answer));
  }, [expressions]);

  const generateNextExpression = React.useCallback(() => {
    const expression = generateExpression(mode, usedAnswers);
    if (expression) {
      setExpressions((prev) => [...prev, expression]);
    } else {
      // No more unique expressions available
      setStatus("lost");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [mode, usedAnswers]);

  const play = React.useCallback(() => {
    setStatus("playing");
    setExpressions([]);

    // Generate first expression immediately
    const firstExpression = generateExpression(mode, new Set());
    if (firstExpression) {
      setExpressions([firstExpression]);
    }

    // Set up interval for subsequent expressions
    intervalRef.current = setInterval(() => {
      generateNextExpression();
    }, delay);
  }, [mode, delay, generateNextExpression]);

  const bingo = React.useCallback(() => {
    setStatus("won");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = React.useCallback(() => {
    setStatus("waiting");
    setExpressions([]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Cleanup interval on unmount or when status changes to waiting
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    status,
    expressions,
    mode,
    play,
    bingo,
    reset,
  };
}
