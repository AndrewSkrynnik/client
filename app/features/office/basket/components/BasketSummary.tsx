"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/buttons/Button";

import { useBasket } from "@/hooks/useBasket";
import { useOrders } from "@/hooks/useOrders";

import { formatNumber } from "@/utils/format-number";

import styles from "@/styles/pages/office/basket/Basket.module.css";

interface BasketSummaryProps {
  selectedSet: Set<string>;
  setSelectedSet: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const BasketSummary = ({
  selectedSet,
  setSelectedSet
}: BasketSummaryProps) => {
  const router = useRouter();

  const { items, deleteSelectedAsync } = useBasket({
    selectedSet,
    setSelectedSet
  });
  const { createOrderAsync } = useOrders();

  const selectedItems = useMemo(
    () => items.filter(item => item.selected),
    [items]
  );

  const selectedCount = useMemo(
    () => selectedItems.reduce((acc, item) => acc + item.qty, 0),
    [selectedItems]
  );

  const selectedPrice = useMemo(
    () => selectedItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    [selectedItems]
  );

  const totalCount = useMemo(
    () => items.reduce((acc, item) => acc + item.qty, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.qty, 0),
    [items]
  );

  const handleCheckout = async () => {
    try {
      const payload = selectedItems.map(item => ({
        skuId: item.skuId,
        supplierId: item.supplierId,
        qty: item.qty,
        article: item.article,
        brand: item.brand,
        description: item.description,
        clientPrice: item.price,
        totalPrice: item.price * item.qty
      }));
      console.log("🛒 Отправляем заказ:", payload);

      await createOrderAsync(payload);
      toast.success("Заказ успешно оформлен!");
      await deleteSelectedAsync();
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
