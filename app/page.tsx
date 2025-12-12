"use client";

import { useGame, GameMode } from "./_hooks/useGame";
import { useEffect, useRef } from "react";
import { playDropSound } from "./_utils/sound";
import { GameState } from "./_components/GameState";
import { useAudioContext } from "./_hooks/useAudioContext";
import { useLocalStorage } from "./_hooks/useLocalStorage";

export default function Game() {
  const [mode, setMode] = useLocalStorage<GameMode>(
    "times-table-bingo-mode",
    "multiplication"
  );
  const [delay, setDelay] = useLocalStorage<number>(
    "times-table-bingo-delay",
    3000
  );
  const [showAnswers, setShowAnswers] = useLocalStorage<boolean>(
    "times-table-bingo-show-answers",
    false
  );
  const game = useGame({ mode, delay });
  const audioContext = useAudioContext();
  const prevExpressionCountRef = useRef(0);

  // Play sound when new expression is added
  useEffect(() => {
    if (
      game.status === "playing" &&
      game.expressions.length > prevExpressionCountRef.current &&
      audioContext
    ) {
      playDropSound(audioContext);
    }
    prevExpressionCountRef.current = game.expressions.length;
  }, [game.expressions.length, game.status, audioContext]);

  return (
    <GameState
      status={game.status}
      mode={mode}
      delay={delay}
      showAnswers={showAnswers}
      expressions={game.expressions}
      onPlay={game.play}
      onModeChange={setMode}
      onDelayChange={setDelay}
      onShowAnswersChange={setShowAnswers}
      onBingo={game.bingo}
      onReset={game.reset}
      onPlayAgain={game.reset}
    />
  );
}
