"use client";

import { useGame, GameMode } from "./_hooks/useGame";
import { useEffect, useRef, useState } from "react";
import { playDropSound } from "./_utils/sound";
import { GameState } from "./_components/GameState";
import { useAudioContext } from "./_hooks/useAudioContext";

export default function Game() {
  const [mode, setMode] = useState<GameMode>("multiplication");
  const [delay, setDelay] = useState(3000);
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
      expressions={game.expressions}
      onPlay={game.play}
      onModeChange={setMode}
      onDelayChange={setDelay}
      onBingo={game.bingo}
      onReset={game.reset}
      onPlayAgain={game.reset}
    />
  );
}
