import { FC } from "react";

import { ShoppingCartIcon } from "@/components/icons";

interface CartTotalProps {
  price: string;
  count: number;
  onAddToCart: () => void;
}

export const CartTotal: FC<CartTotalProps> = ({
  price,
  count,
  onAddToCart
}) => {
  const totalPrice = (parseFloat(price) * count).toFixed(2);

  return (
    <div className="flex flex-col items-center gap-y-2">
      <button
        className="flex items-center justify-center gap-2 rounded bg-blue-500 px-2 py-1 text-white disabled:bg-gray-300"
        onClick={onAddToCart}
        disabled={count === 0}
      >
        <ShoppingCartIcon sx={{ fontSize: 18 }} />
      </button>
      <span className="text-sm">{totalPrice} ₽</span>
    </div>
  );
};
