import { Button } from "@/components/ui/buttons/Button";

import { useBasketStore } from "@/store/useBasketStore";

import styles from "@/styles/pages/office/basket/Basket.module.css";

export const BasketSummary = () => {
  const getTotalCount = useBasketStore(state => state.getTotalCount);
  const getTotalPrice = useBasketStore(state => state.getTotalPrice);
  const totalCount = getTotalCount();
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    // TODO: реализовать оформление заказа
    alert("Функционал оформления заказа в разработке.");
  };

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryInfo}>
        <div className={styles.summaryTitle}>Итого в заказе:</div>
        <div className={styles.summaryInfoItem}>
          <p>Количество товаров:</p> <span>{totalCount} шт.</span>
        </div>
        <div className={styles.summaryInfoItem}>
          <p>Общая стоимость:</p> <span>{totalPrice} ₽</span>
        </div>
      </div>
      <div className={styles.summaryButtonWrapper}>
        <Button onClick={handleCheckout}>Оформить заказ</Button>
      </div>
    </div>
  );
};
