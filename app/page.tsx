"use client";

import { useGame, GameMode } from "./_hooks/useGame";
import { useEffect, useRef, useState } from "react";
import { playDropSound } from "./_utils/sound";
import { GameState } from "./_components/GameState";
import { useAudioContext } from "./_hooks/useAudioContext";
import { useLocalStorage } from "./_hooks/useLocalStorage";

export default function Game() {
  const [mode, setMode, isModeLoaded] = useLocalStorage<GameMode>(
    "times-table-bingo-mode",
    "multiplication"
  );
  const [delay, setDelay, isDelayLoaded] = useLocalStorage<number>(
    "times-table-bingo-delay",
    3000
  );
  const [showAnswers, setShowAnswers, isShowAnswersLoaded] = useLocalStorage<boolean>(
    "times-table-bingo-show-answers",
    false
  );
  const [selectedTimesTables, setSelectedTimesTables, isSelectedTablesLoaded] = useLocalStorage<number[]>(
    "times-table-bingo-selected-tables",
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  );

  const [isHydrated, setIsHydrated] = useState(false);

  const isLoaded = isModeLoaded && isDelayLoaded && isShowAnswersLoaded && isSelectedTablesLoaded;

  const game = useGame({ mode, delay, selectedTimesTables });
  const audioContext = useAudioContext();
  const prevExpressionCountRef = useRef(0);

  // Wait for local storage to load before rendering
  useEffect(() => {
    if (isLoaded) {
      setIsHydrated(true);
    }
  }, [isLoaded]);

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

  if (!isHydrated) {
    return null;
  }

  return (
    <GameState
      status={game.status}
      mode={mode}
      delay={delay}
      showAnswers={showAnswers}
      selectedTimesTables={selectedTimesTables}
      expressions={game.expressions}
      onPlay={game.play}
      onModeChange={setMode}
      onDelayChange={setDelay}
      onShowAnswersChange={setShowAnswers}
      onSelectedTimesTablesChange={setSelectedTimesTables}
      onBingo={game.bingo}
      onReset={game.reset}
      onPlayAgain={game.reset}
    />
  );
}
