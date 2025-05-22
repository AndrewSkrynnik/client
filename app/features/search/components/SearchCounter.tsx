import { FC } from "react";

import styles from "@/styles/components/ui/counter/Counter.module.css";

interface SearchCounterProps {
  count: number;
  stock: number;
  price: string;
  onChange: (value: number) => void;
}

export const SearchCounter: FC<SearchCounterProps> = ({
  count,
  stock,
  price,
  onChange
}) => {
  const totalPrice = (parseFloat(price) * count).toFixed(2);
  const safeValue = Number.isFinite(count) ? count.toString() : "0";

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          onClick={() => onChange(Math.max(0, count - 1))}
          disabled={count === 0}
          className={`${styles.button} ${count === 0 ? styles.buttonDisabled : styles.buttonActive}`}
        >
          –
        </button>
        <input
          type="text"
          inputMode="numeric"
          value={safeValue}
          onChange={e => {
            const raw = e.target.value.replace(/\D/g, "");
            const parsed = parseInt(raw, 10);
            onChange(isNaN(parsed) ? 0 : Math.min(parsed, stock));
          }}
          className={styles.input}
        />
        <button
          onClick={() => onChange(Math.min(count + 1, stock))}
          disabled={count >= stock}
          className={`${styles.button} ${count >= stock ? styles.buttonDisabled : styles.buttonActive}`}
        >
          +
        </button>
      </div>
      <span className="text-sm">{totalPrice} ₽</span>
    </div>
  );
};
