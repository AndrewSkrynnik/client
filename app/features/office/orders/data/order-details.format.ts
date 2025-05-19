import { OrderDetailsItem } from "@/features/office/orders/types";

/** Форматирует значения ячеек таблицы */
export const formatOrderDetailsValue = (
  key: keyof OrderDetailsItem,
  value: unknown
): string =>
  (key === "price" || key === "totalPrice") && typeof value === "number"
    ? new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB"
      }).format(value)
    : String(value ?? "-");
