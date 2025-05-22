import { BasketCounterProps } from "@/features/office/basket/types";

import styles from "@/styles/components/ui/counter/Counter.module.css";

export const BasketCounter = ({
  count = 1, // ✅ минимум по умолчанию 1
  stock = 1,
  onChange
}: BasketCounterProps) => {
  const safeValue = Number.isFinite(count) ? count.toString() : "1"; // ✅ показываем "1", а не "0"

  return (
    <div className={styles.container}>
      <button
        onClick={() => onChange(Math.max(1, count - 1))} // ✅ минимум 1
        disabled={count <= 1}
        className={`${styles.button} ${count <= 1 ? styles.buttonDisabled : styles.buttonActive}`}
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
          const next = isNaN(parsed) ? 1 : Math.max(1, Math.min(parsed, stock)); // ✅ min 1
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
