import { Button } from "@/components/ui/buttons/Button";

import { useBasketStore } from "@/store/useBasketStore";

import { formatNumber } from "@/utils/format-number";

import styles from "@/styles/pages/office/basket/Basket.module.css";

export const BasketSummary = () => {
  const items = useBasketStore(state => state.items);
  const removeSelectedItems = useBasketStore(
    state => state.removeSelectedItems
  );

  const selectedItems = items.filter(item => item.selected);
  const totalItems = items;

  const selectedCount = selectedItems.reduce(
    (acc, item) => acc + item.count,
    0
  );
  const selectedPrice = selectedItems.reduce(
    (acc, item) => acc + item.totalPrice,
    0
  );

  const totalCount = totalItems.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = totalItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Выберите товары для оформления заказа.");
      return;
    }

    console.log("[checkout]: оформленные товары", selectedItems);
    alert("Товары успешно добавлены в заказ!");
    removeSelectedItems();
  };

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryInfo}>
        <div className={styles.summaryTitle}>Итого в корзине:</div>
        <div className={styles.summaryInfoItem}>
          <p>Количество товаров:</p> <span>{totalCount} шт.</span>
        </div>
        <div className={styles.summaryInfoItem}>
          <p>Общая стоимость:</p>
          <span>{formatNumber(totalPrice)} ₽</span>
        </div>
      </div>

      <div className={styles.summaryInfo}>
        <div className={styles.summaryTitle}>Итого в заказе:</div>
        <div className={styles.summaryInfoItem}>
          <p>Количество товаров:</p> <span>{selectedCount} шт.</span>
        </div>
        <div className={styles.summaryInfoItem}>
          <p>Общая стоимость:</p>
          <span>{formatNumber(selectedPrice)} ₽</span>
        </div>
      </div>

      <div className={styles.summaryButtonWrapper}>
        <Button onClick={handleCheckout}>Оформить заказ</Button>
      </div>
    </div>
  );
};
