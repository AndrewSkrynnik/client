import { FC } from "react";

interface CounterProps {
  index: number;
  count: number;
  stock: number;
  price: string;
  updateCount: (index: number, value: number) => void;
  handleInputChange: (index: number, value: string) => void;
}

export const Counter: FC<CounterProps> = ({
  index,
  count,
  stock,
  updateCount,
  handleInputChange
}) => (
  <div className="flex items-center justify-center">
    <button
      className="rounded bg-gray-300 px-2"
      onClick={() => updateCount(index, -1)}
      disabled={count === 0}
      style={{ cursor: count === 0 ? "not-allowed" : "pointer" }}
    >
      −
    </button>
    <input
      type="text"
      value={count}
      onChange={e => handleInputChange(index, e.target.value)}
      className="border text-center"
      style={{ width: "40px" }}
    />
    <button
      className="rounded bg-gray-300 px-2"
      onClick={() => updateCount(index, 1)}
      disabled={count >= stock}
      style={{ cursor: count >= stock ? "not-allowed" : "pointer" }}
    >
      +
    </button>
  </div>
);
