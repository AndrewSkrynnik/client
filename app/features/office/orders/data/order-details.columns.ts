import { OrderDetailsItem } from "@/features/office/orders/types";

/** Колонки для таблицы деталей заказа */
export const orderDetailsColumns: {
  key: keyof OrderDetailsItem;
  label: string;
  width?: string;
}[] = [
  { key: "brand", label: "Бренд", width: "140px" },
  { key: "name", label: "Деталь" },
  { key: "article", label: "Артикул", width: "140px" },
  { key: "price", label: "Цена, шт.", width: "120px" },
  { key: "qtyItem", label: "Кол-во деталей", width: "150px" },
  { key: "totalPrice", label: "Сумма", width: "140px" }
];
