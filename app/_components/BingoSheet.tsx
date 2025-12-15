interface BingoSheetProps {
  answers: number[];
  columns: number;
  rows: number;
}

export function BingoSheet({ answers, columns, rows }: BingoSheetProps) {
  const cells = answers.slice(0, columns * rows);

  return (
    <div className="border-2 border-black p-4 bg-white">
      <h2 className="text-xl font-bold text-center mb-4">Times Table Bingo</h2>
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((answer, index) => (
          <div
            key={index}
            className="border border-black aspect-square flex items-center justify-center text-2xl font-bold"
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
}
