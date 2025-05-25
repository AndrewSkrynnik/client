import { useEffect, useState } from "react";

import { SearchCounterProps } from "@/features/search/types";

import { formatNumber } from "@/utils/format-number";

import styles from "@/styles/components/ui/counter/Counter.module.css";

export const SearchCounter = ({
  count,
  stock,
  price,
  onIncrement,
  onDecrement,
  onInputChange
}: SearchCounterProps) => {
  const [inputValue, setInputValue] = useState(count.toString());

  // синхронизируем ввод при изменении count извне
  useEffect(() => {
    setInputValue(count.toString());
  }, [count]);

  const totalPrice = formatNumber(price * count);

  const handleInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    const trimmed = digits.replace(/^0+(?!$)/, ""); // убираем leading zero
    const parsed = parseInt(trimmed || "0", 10);

    const clamped = Math.min(parsed, stock);
    setInputValue(clamped.toString());
    onInputChange?.(clamped);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          onClick={onDecrement}
          disabled={count === 0}
          className={`${styles.button} ${count === 0 ? styles.buttonDisabled : styles.buttonActive}`}
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
          onClick={onIncrement}
          disabled={count >= stock}
          className={`${styles.button} ${count >= stock ? styles.buttonDisabled : styles.buttonActive}`}
        >
          +
        </button>
      </div>
      <span className="text-sm">{totalPrice}</span>
    </div>
  );
};
