import Link from "next/link";

import styles from "@/styles/pages/office/basket/Basket.module.css";

export const BasketEmpty = () => (
  <div className={styles.emptyBasketContainer}>
    <h4 className={styles.emptyBasketTitle}>Корзина пуста</h4>
    <div className={styles.emptyBasketContent}>
      <p>Похоже, вы ещё не добавили товары.</p>
      <p className="pb-2.5">
        Перейдите на{" "}
        <Link className="link" href="/">
          главную страницу
        </Link>
        , чтобы начать поиск и выбрать нужные автозапчасти.
      </p>
    </div>
  </div>
);
