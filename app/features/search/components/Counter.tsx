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
  price,
  updateCount,
  handleInputChange
}) => {
  const totalPrice = (parseFloat(price) * count).toFixed(2);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => updateCount(index, -1)}
          disabled={count === 0}
          className={`text-md flex h-6 w-6 items-center justify-center rounded-md font-bold ${
            count === 0
              ? "cursor-not-allowed bg-gray-100 text-gray-300"
              : "cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          –
        </button>

        <input
          type="text"
          value={count}
          onChange={e => handleInputChange(index, e.target.value)}
          className="w-6 text-center text-sm font-medium focus:outline-none"
        />

        <button
          onClick={() => updateCount(index, 1)}
          disabled={count >= stock}
          className={`text-md flex h-6 w-6 items-center justify-center rounded-md font-bold ${
            count >= stock
              ? "cursor-not-allowed bg-gray-100 text-gray-300"
              : "cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          +
        </button>
      </div>
      <span className="text-sm">{totalPrice} ₽</span>
    </div>
  );
};
