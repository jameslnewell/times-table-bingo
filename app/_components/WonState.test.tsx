import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WonState } from "./WonState";
import { GameExpression } from "../_hooks/useGame";

describe("WonState", () => {
  const mockExpressions: GameExpression[] = [
    { left: 3, right: 4, answer: 12 },
    { left: 5, right: 6, answer: 30 },
    { left: 7, right: 8, answer: 56 },
  ];

  const defaultProps = {
    expressions: mockExpressions,
    mode: "multiplication" as const,
    onPlayAgain: vi.fn(),
  };

  it("renders congratulations message", () => {
    render(<WonState {...defaultProps} />);
    expect(screen.getByText("Congratulations!")).toBeInTheDocument();
    expect(screen.getByText("You won the game!")).toBeInTheDocument();
  });

  it("displays all expressions with multiplication", () => {
    render(<WonState {...defaultProps} />);
    expect(screen.getByText("3 × 4 = 12")).toBeInTheDocument();
    expect(screen.getByText("5 × 6 = 30")).toBeInTheDocument();
    expect(screen.getByText("7 × 8 = 56")).toBeInTheDocument();
  });

  it("displays all expressions with division when mode is division", () => {
    const divisionExpressions: GameExpression[] = [
      { left: 12, right: 3, answer: 4 },
      { left: 30, right: 5, answer: 6 },
    ];

    render(
      <WonState
        {...defaultProps}
        mode="division"
        expressions={divisionExpressions}
      />
    );

    expect(screen.getByText("12 ÷ 3 = 4")).toBeInTheDocument();
    expect(screen.getByText("30 ÷ 5 = 6")).toBeInTheDocument();
  });

  it("calls onPlayAgain when Play Again button is clicked", () => {
    const onPlayAgain = vi.fn();
    render(<WonState {...defaultProps} onPlayAgain={onPlayAgain} />);

    const playAgainButton = screen.getByText("Play Again");
    fireEvent.click(playAgainButton);

    expect(onPlayAgain).toHaveBeenCalledTimes(1);
  });

  it("renders Play Again button", () => {
    render(<WonState {...defaultProps} />);
    expect(screen.getByText("Play Again")).toBeInTheDocument();
  });

  it("renders all expressions in a grid", () => {
    const { container } = render(<WonState {...defaultProps} />);
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid?.children).toHaveLength(mockExpressions.length);
  });
});
