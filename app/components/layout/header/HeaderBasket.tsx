"use client";

import Link from "next/link";

import { ShoppingCartIcon } from "@/components/icons";

import styles from "@/styles/components/layout/header/Header.module.css";

const pluralize = (
  count: number,
  [one, few, many]: [string, string, string]
) =>
  count % 10 === 1 && count % 100 !== 11
    ? one
    : count % 10 >= 2 &&
        count % 10 <= 4 &&
        (count % 100 < 10 || count % 100 >= 20)
      ? few
      : many;

export const HeaderBasket = () => (
  /* const { totalQuantity, totalPrice, loadBasket } = useBasketStore();

  useEffect(() => {
    const userId = useAuthStore.getState().user?.id; // Получаем ID пользователя из authStore
    if (userId) {
      loadBasket(userId);
    }
  }, [loadBasket]);
 */
  <Link href="/office/basket">
    <div className={styles.basketMenu}>
      <div className="flex flex-col">
        корзина пуста
        {/* {totalQuantity > 0 ? (
          <>
            <p className={styles.basketMenuTitle}>В корзине</p>
            <span className={styles.basketMenuText}>
              {totalQuantity}{" "}
              {pluralize(totalQuantity, ["товар", "товара", "товаров"])}:{" "}
              {totalPrice.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB"
              })}
            </span>
          </>
        ) : (
          <p className={styles.basketMenuText}>Корзина пуста</p>
        )} */}
      </div>
      <div className={styles.basketMenuIconWrapper}>
        <ShoppingCartIcon fontSize="large" />
        {/* {totalQuantity > 0 && (
          <p className={styles.basketMenuIconCounter}>{totalQuantity}</p>
        )} */}
      </div>
    </div>
  </Link>
);
