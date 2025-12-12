import * as React from "react";

export type GameMode = "multiplication" | "division" | "addition" | "subtraction";
export type GameStatus = "waiting" | "playing" | "won" | "lost";

export interface GameExpression {
  left: number;
  right: number;
  answer: number;
}

export interface GameConfig {
  mode?: GameMode;
  delay?: number;
  selectedTimesTables?: number[];
}

export interface GameState {
  status: GameStatus;
  expressions: GameExpression[];
}

const TIMES_TABLES_MAX = 12;

function generateExpression(
  mode: GameMode,
  usedAnswers: Set<number>,
  selectedTimesTables: number[]
): GameExpression | null {
  const maxAttempts = 100;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const left = Math.floor(Math.random() * TIMES_TABLES_MAX) + 1;
    const right = Math.floor(Math.random() * TIMES_TABLES_MAX) + 1;
    const product = left * right;

    // Check if at least one of left or right is in the selected times tables
    const isValid = selectedTimesTables.includes(left) || selectedTimesTables.includes(right);

    let expression: GameExpression;

    if (mode === "multiplication") {
      expression = {
        left,
        right,
        answer: product,
      };
    } else if (mode === "division") {
      expression = {
        left: product,
        right,
        answer: left,
      };
    } else if (mode === "addition") {
      // For addition: (product - right) + right = product
      // This ensures the answer (product) is from the times tables
      expression = {
        left: product - right,
        right,
        answer: product,
      };
    } else {
      // For subtraction: product - (product - left) = left
      // This ensures the answer (left) is from the times tables
      expression = {
        left: product,
        right: product - left,
        answer: left,
      };
    }

    if (!usedAnswers.has(expression.answer) && isValid) {
      return expression;
    }

    attempts++;
  }

  return null;
}

export function useGame(config: GameConfig = {}) {
  const { delay = 3000, mode = "multiplication", selectedTimesTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] } = config;

  const [status, setStatus] = React.useState<GameStatus>("waiting");
  const [expressions, setExpressions] = React.useState<GameExpression[]>([]);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const generateNextExpression = React.useCallback(() => {
    setExpressions((prev) => {
      const usedAnswers = new Set(prev.map((expr) => expr.answer));
      const expression = generateExpression(mode, usedAnswers, selectedTimesTables);

      if (expression) {
        return [...prev, expression];
      } else {
        // No more unique expressions available
        setStatus("lost");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return prev;
      }
    });
  }, [mode, selectedTimesTables]);

  const play = React.useCallback(() => {
    setStatus("playing");
    setExpressions([]);

    // Generate first expression immediately
    const firstExpression = generateExpression(mode, new Set(), selectedTimesTables);
    if (firstExpression) {
      setExpressions([firstExpression]);
    }

    // Set up interval for subsequent expressions
    intervalRef.current = setInterval(() => {
      generateNextExpression();
    }, delay);
  }, [mode, delay, selectedTimesTables, generateNextExpression]);

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
