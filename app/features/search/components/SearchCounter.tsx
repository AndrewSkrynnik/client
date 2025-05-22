import { SearchCounterProps } from "@/features/search/types";

import styles from "@/styles/components/ui/counter/Counter.module.css";

export const SearchCounter = ({
  index,
  count,
  stock,
  price,
  updateCount,
  handleInputChange
}: SearchCounterProps) => {
  const totalPrice = (parseFloat(price) * count).toFixed(2);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button
          onClick={() => updateCount(index, -1)}
          disabled={count === 0}
          className={`${styles.button} ${count === 0 ? styles.buttonDisabled : styles.buttonActive}`}
        >
          –
        </button>
        <input
          type="text"
          value={count}
          onChange={e => handleInputChange(index, e.target.value)}
          className={styles.input}
        />
        <button
          onClick={() => updateCount(index, 1)}
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
