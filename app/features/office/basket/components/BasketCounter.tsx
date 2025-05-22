import { BasketCounterProps } from "@/features/office/basket/types";

import styles from "@/styles/components/ui/counter/Counter.module.css";

export const BasketCounter = ({
  count = 0,
  stock = 0,
  onChange
}: BasketCounterProps) => {
  const safeValue = Number.isFinite(count) ? count.toString() : "0";

  return (
    <div className={styles.container}>
      <button
        onClick={() => onChange(Math.max(0, count - 1))}
        disabled={count <= 0}
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
          const next = isNaN(parsed) ? 0 : Math.min(parsed, stock);
          onChange(next);
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
  );
};
