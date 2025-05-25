"use client";

import { FC, useEffect, useState } from "react";

import { BasketCounterProps } from "@/features/office/basket/types";

import { useBasketStore } from "@/store/useBasketStore";

import styles from "@/styles/components/ui/counter/Counter.module.css";

export const BasketCounter: FC<BasketCounterProps> = ({ brand, number }) => {
  const update = useBasketStore(state => state.updateCount);
  const increment = useBasketStore(state => state.incrementItemCount);
  const decrement = useBasketStore(state => state.decrementItemCount);

  const item = useBasketStore(state =>
    state.items.find(i => i.brand === brand && i.number === number)
  );

  // fallback значения для item, чтобы не вызывать хуки условно
  const count = item?.count ?? 1;
  const stock = item?.stock ?? 1;
  const price = item?.price ?? 0;
  const description = item?.description ?? "";

  const [inputValue, setInputValue] = useState(count.toString());

  useEffect(() => {
    setInputValue(count.toString());
  }, [count]);

  const handleInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    const trimmed = digits.replace(/^0+(?!$)/, "");
    const parsed = parseInt(trimmed || "1", 10);
    const clamped = Math.min(Math.max(parsed, 1), stock);

    setInputValue(clamped.toString());
    update(number, brand, clamped);
  };

  if (!item) return null;

  return (
    <div className={styles.container}>
      <button
        onClick={() => decrement(number, brand)}
        disabled={count <= 1}
        className={`${styles.button} ${count <= 1 ? styles.buttonDisabled : styles.buttonActive}`}
      >
        –
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={inputValue}
        onChange={e => handleInput(e.target.value)}
        className={styles.input}
      />

      <button
        onClick={() =>
          increment({ number, brand, price, description, stock, count: 1 })
        }
        disabled={count >= stock}
        className={`${styles.button} ${count >= stock ? styles.buttonDisabled : styles.buttonActive}`}
      >
        +
      </button>
    </div>
  );
};
