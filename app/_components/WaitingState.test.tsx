import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WaitingState } from "./WaitingState";

describe("WaitingState", () => {
  const defaultProps = {
    onPlay: vi.fn(),
    delay: 3000,
    mode: "multiplication" as const,
    onDelayChange: vi.fn(),
    onModeChange: vi.fn(),
  };

  it("renders game mode selection", () => {
    render(<WaitingState {...defaultProps} />);
    expect(screen.getByText("Game Mode")).toBeInTheDocument();
    expect(screen.getByText("Multiplication")).toBeInTheDocument();
    expect(screen.getByText("Division")).toBeInTheDocument();
  });

  it("displays the current speed", () => {
    render(<WaitingState {...defaultProps} />);
    expect(screen.getByText("Speed: 3s")).toBeInTheDocument();
  });

  it("highlights the selected mode", () => {
    const { rerender } = render(<WaitingState {...defaultProps} />);
    const multiplicationButton = screen.getByText("Multiplication");
    expect(multiplicationButton).toHaveClass("bg-blue-600");

    rerender(<WaitingState {...defaultProps} mode="division" />);
    const divisionButton = screen.getByText("Division");
    expect(divisionButton).toHaveClass("bg-blue-600");
  });

  it("calls onPlay when Play Now button is clicked", () => {
    const onPlay = vi.fn();
    render(<WaitingState {...defaultProps} onPlay={onPlay} />);

    const playButton = screen.getByText("Play Now");
    fireEvent.click(playButton);

    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  it("calls onModeChange when mode button is clicked", () => {
    const onModeChange = vi.fn();
    render(<WaitingState {...defaultProps} onModeChange={onModeChange} />);

    const divisionButton = screen.getByText("Division");
    fireEvent.click(divisionButton);

    expect(onModeChange).toHaveBeenCalledWith("division");
  });

  it("calls onDelayChange when range slider is changed", () => {
    const onDelayChange = vi.fn();
    render(<WaitingState {...defaultProps} onDelayChange={onDelayChange} />);

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "4000" } });

    expect(onDelayChange).toHaveBeenCalledWith(4000);
  });

  it("displays speed range labels", () => {
    render(<WaitingState {...defaultProps} />);
    expect(screen.getByText("Fast (1s)")).toBeInTheDocument();
    expect(screen.getByText("Slow (5s)")).toBeInTheDocument();
  });
});
