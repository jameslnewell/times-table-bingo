import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PlayingState } from "./PlayingState";
import { GameExpression } from "../_hooks/useGame";

describe("PlayingState", () => {
  const mockExpressions: GameExpression[] = [
    { left: 3, right: 4, answer: 12 },
    { left: 5, right: 6, answer: 30 },
    { left: 7, right: 8, answer: 56 },
  ];

  const defaultProps = {
    expressions: mockExpressions,
    mode: "multiplication" as const,
    onBingo: vi.fn(),
    onReset: vi.fn(),
  };

  it("renders all expressions", () => {
    render(<PlayingState {...defaultProps} />);
    expect(screen.getByText("3 × 4")).toBeInTheDocument();
    expect(screen.getByText("5 × 6")).toBeInTheDocument();
    expect(screen.getByText("7 × 8")).toBeInTheDocument();
  });

  it("renders division expressions when mode is division", () => {
    const divisionExpressions: GameExpression[] = [
      { left: 12, right: 3, answer: 4 },
      { left: 30, right: 5, answer: 6 },
    ];

    render(
      <PlayingState
        {...defaultProps}
        mode="division"
        expressions={divisionExpressions}
      />
    );

    expect(screen.getByText("12 ÷ 3")).toBeInTheDocument();
    expect(screen.getByText("30 ÷ 5")).toBeInTheDocument();
  });

  it("highlights the newest expression with larger text", () => {
    const { container } = render(<PlayingState {...defaultProps} />);
    const expressions = container.querySelectorAll(".text-7xl");
    expect(expressions).toHaveLength(1);
  });

  it("calls onBingo when Bingo button is clicked", () => {
    const onBingo = vi.fn();
    render(<PlayingState {...defaultProps} onBingo={onBingo} />);

    const bingoButton = screen.getByText("Bingo!");
    fireEvent.click(bingoButton);

    expect(onBingo).toHaveBeenCalledTimes(1);
  });

  it("calls onReset when Exit button is clicked", () => {
    const onReset = vi.fn();
    render(<PlayingState {...defaultProps} onReset={onReset} />);

    const exitButton = screen.getByText("Exit");
    fireEvent.click(exitButton);

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it("renders Bingo and Exit buttons", () => {
    render(<PlayingState {...defaultProps} />);
    expect(screen.getByText("Bingo!")).toBeInTheDocument();
    expect(screen.getByText("Exit")).toBeInTheDocument();
  });
});
