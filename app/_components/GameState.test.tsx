import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { GameState } from "./GameState";
import { GameExpression } from "../_hooks/useGame";

describe("GameState", () => {
  const mockExpressions: GameExpression[] = [
    { left: 3, right: 4, answer: 12 },
    { left: 5, right: 6, answer: 30 },
  ];

  const defaultProps = {
    mode: "multiplication" as const,
    delay: 3000,
    showAnswers: false,
    selectedTimesTables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    expressions: mockExpressions,
    onPlay: vi.fn(),
    onModeChange: vi.fn(),
    onDelayChange: vi.fn(),
    onShowAnswersChange: vi.fn(),
    onSelectedTimesTablesChange: vi.fn(),
    onBingo: vi.fn(),
    onReset: vi.fn(),
    onPlayAgain: vi.fn(),
  };

  describe("waiting status", () => {
    it("renders WaitingState component", () => {
      render(<GameState {...defaultProps} status="waiting" />);
      expect(screen.getByText("Game Mode")).toBeInTheDocument();
      expect(screen.getByText("Play Now")).toBeInTheDocument();
    });

    it("does not render other state components", () => {
      render(<GameState {...defaultProps} status="waiting" />);
      expect(screen.queryByText("Bingo!")).not.toBeInTheDocument();
      expect(screen.queryByText("Congratulations!")).not.toBeInTheDocument();
      expect(screen.queryByText("Nice Try!")).not.toBeInTheDocument();
    });
  });

  describe("playing status", () => {
    it("renders PlayingState component", () => {
      render(<GameState {...defaultProps} status="playing" />);
      expect(screen.getByText("Bingo!")).toBeInTheDocument();
      expect(screen.getByText("Exit")).toBeInTheDocument();
    });

    it("does not render other state components", () => {
      render(<GameState {...defaultProps} status="playing" />);
      expect(screen.queryByText("Play Now")).not.toBeInTheDocument();
      expect(screen.queryByText("Congratulations!")).not.toBeInTheDocument();
      expect(screen.queryByText("Nice Try!")).not.toBeInTheDocument();
    });
  });

  describe("won status", () => {
    it("renders WonState component", () => {
      render(<GameState {...defaultProps} status="won" />);
      expect(screen.getByText("Congratulations!")).toBeInTheDocument();
      expect(screen.getByText("You won the game!")).toBeInTheDocument();
      expect(screen.getByText("Play Again")).toBeInTheDocument();
    });

    it("does not render other state components", () => {
      render(<GameState {...defaultProps} status="won" />);
      expect(screen.queryByText("Play Now")).not.toBeInTheDocument();
      expect(screen.queryByText("Bingo!")).not.toBeInTheDocument();
      expect(screen.queryByText("Nice Try!")).not.toBeInTheDocument();
    });
  });

  describe("lost status", () => {
    it("renders LostState component", () => {
      render(<GameState {...defaultProps} status="lost" />);
      expect(screen.getByText("Nice Try!")).toBeInTheDocument();
      expect(
        screen.getByText("All times tables have been used!")
      ).toBeInTheDocument();
      expect(screen.getByText("Play Again")).toBeInTheDocument();
    });

    it("does not render other state components", () => {
      render(<GameState {...defaultProps} status="lost" />);
      expect(screen.queryByText("Play Now")).not.toBeInTheDocument();
      expect(screen.queryByText("Bingo!")).not.toBeInTheDocument();
      expect(screen.queryByText("Congratulations!")).not.toBeInTheDocument();
    });
  });

  describe("status transitions", () => {
    it("switches from waiting to playing", () => {
      const { rerender } = render(
        <GameState {...defaultProps} status="waiting" />
      );
      expect(screen.getByText("Play Now")).toBeInTheDocument();

      rerender(<GameState {...defaultProps} status="playing" />);
      expect(screen.getByText("Bingo!")).toBeInTheDocument();
      expect(screen.queryByText("Play Now")).not.toBeInTheDocument();
    });

    it("switches from playing to won", () => {
      const { rerender } = render(
        <GameState {...defaultProps} status="playing" />
      );
      expect(screen.getByText("Bingo!")).toBeInTheDocument();

      rerender(<GameState {...defaultProps} status="won" />);
      expect(screen.getByText("Congratulations!")).toBeInTheDocument();
      expect(screen.queryByText("Bingo!")).not.toBeInTheDocument();
    });

    it("switches from playing to lost", () => {
      const { rerender } = render(
        <GameState {...defaultProps} status="playing" />
      );
      expect(screen.getByText("Bingo!")).toBeInTheDocument();

      rerender(<GameState {...defaultProps} status="lost" />);
      expect(screen.getByText("Nice Try!")).toBeInTheDocument();
      expect(screen.queryByText("Bingo!")).not.toBeInTheDocument();
    });
  });
});
