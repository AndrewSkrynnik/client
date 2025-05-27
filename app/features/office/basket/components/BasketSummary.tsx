import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/buttons/Button";

import { useBasketStore } from "@/store/useBasketStore";
import { useOrderStore } from "@/store/useOrderStore";

import { formatNumber } from "@/utils/format-number";

import styles from "@/styles/pages/office/basket/Basket.module.css";

export const BasketSummary = () => {
  const createOrder = useOrderStore(state => state.createOrder);
  const items = useBasketStore(state => state.items);
  const removeSelectedItems = useBasketStore(
    state => state.removeSelectedItems
  );

  const router = useRouter();

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
    const orderItems = selectedItems.map(item => ({
      brand: item.brand,
      article: item.number,
      name: item.description,
      price: item.price,
      qtyItem: item.count,
      totalPrice: item.totalPrice
    }));

    try {
      createOrder(orderItems, selectedPrice);
      removeSelectedItems();

      console.log("✅ заказ создан — до toast");
      toast.success("Заказ успешно оформлен!");
      router.push("/office/orders");
    } catch (error: any) {
      toast.error(error?.message || "Ошибка при оформлении заказа");
      console.error("[checkout error]", error);
    }
  };

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.summaryWrapper}>
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

        <div className={`${styles.summaryInfo} ${styles.summaryInfoOrder}`}>
          <div className={`${styles.summaryTitle} ${styles.summaryTitleOrder}`}>
            Итого в заказе:
          </div>
          <div className={styles.summaryInfoItem}>
            <p>Количество товаров:</p> <span>{selectedCount} шт.</span>
          </div>
          <div className={styles.summaryInfoItem}>
            <p>Общая стоимость:</p>
            <span>{formatNumber(selectedPrice)} ₽</span>
          </div>
        </div>
      </div>
      <div className={styles.summaryButtonWrapper}>
        <Button
          isDisabled={selectedItems.length === 0}
          onClick={handleCheckout}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
