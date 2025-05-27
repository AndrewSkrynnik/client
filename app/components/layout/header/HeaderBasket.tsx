"use client";

import Link from "next/link";

import { ShoppingCartIcon } from "@/components/icons";

import { useBasketStore } from "@/store/useBasketStore";

import { pluralize } from "@/utils/pluralize";

import styles from "@/styles/components/layout/header/Header.module.css";

export const HeaderBasket = () => {
  const totalCount = useBasketStore(state => state.getTotalCount());
  const totalPrice = useBasketStore(state => state.getTotalPrice());
  const hasHydrated = useBasketStore(state => state.hasHydrated);

  return (
    <Link href="/office/basket">
      <div className={styles.basketMenu}>
        <div className={styles.basketMenuIconWrapper}>
          <ShoppingCartIcon fontSize="large" />
        </div>
        <div className="flex flex-col">
          {!hasHydrated ? (
            <p className={styles.basketMenuText}>Загрузка...</p>
          ) : totalCount > 0 ? (
            <>
              <p className={styles.basketMenuTitle}>В корзине</p>
              <span className={styles.basketMenuText}>
                {totalCount}{" "}
                {pluralize(totalCount, ["товар", "товара", "товаров"])}:{" "}
                {totalPrice.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB"
                })}
              </span>
            </>
          ) : (
            <p className={styles.basketMenuText}>Корзина пуста</p>
          )}
        </div>
      </div>
    </Link>
  );
};
