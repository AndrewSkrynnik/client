"use client";

import { FC } from "react";

import { BasketCounterProps } from "@/features/office/basket/types";

import { useBasket } from "@/hooks/useBasket";

import styles from "@/styles/components/ui/counter/Counter.module.css";

export const BasketCounter: FC<BasketCounterProps> = ({
  skuId,
  supplierId
}) => {
  const { items, addItem, removeItem } = useBasket();

  const item = items.find(
    i => i.skuId === skuId && i.supplierId === supplierId
  );

  if (!item) return null;

  const count = item.qty;

  return (
    <div className={styles.container}>
      <button
        onClick={() => removeItem({ skuId, supplierId })}
        disabled={count <= 1}
        className={`${styles.button} ${count <= 1 ? styles.buttonDisabled : styles.buttonActive}`}
      >
        –
      </button>

      <input
        type="text"
        value={count}
        className={styles.input}
        disabled // 👈 ручной ввод отключён — API не поддерживает
      />

      <button
        onClick={() => addItem({ skuId, supplierId })}
        className={`${styles.button} ${styles.buttonActive}`}
      >
        +
      </button>
    </div>
  );
};
