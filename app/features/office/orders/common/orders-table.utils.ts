import { OrderTableItem } from "@/features/office/orders/types";

/** Агрегация количества и суммы из деталей */
export const getOrderSummary = (
  details: OrderTableItem["details"] | undefined
) =>
  (details ?? []).reduce(
    (acc, item) => {
      acc.qty += item.qtyItem;
      acc.total += item.totalPrice;
      return acc;
    },
    { qty: 0, total: 0 }
  );
