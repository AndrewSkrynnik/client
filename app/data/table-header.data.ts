import { OrderDetailsItem } from "@/features/office/orders/types";

export type TableHeader = {
  id: number;
  label: string;
};

export const BASKET_TABLE_HEAD: TableHeader[] = [
  { id: 0, label: "Бренд" },
  { id: 1, label: "Артикул" },
  { id: 2, label: "Описание" },
  { id: 3, label: "Цена, руб." },
  { id: 4, label: "Кол-во, шт." },
  { id: 5, label: "Сумма, руб." },
  { id: 6, label: "" },
  { id: 7, label: "" }
];
export const SEARCH_RESULT_TABLE_HEAD: TableHeader[] = [
  { id: 0, label: "Бренд" },
  { id: 1, label: "Артикул" },
  { id: 2, label: "Описание" },
  { id: 3, label: "Инфо" },
  { id: 4, label: "Цена, руб." },
  { id: 5, label: "Наличие, шт." },
  { id: 6, label: "В корзину" }
];

export const SEARCH_TABLE_HEAD: TableHeader[] = [
  { id: 0, label: "Бренд" },
  { id: 1, label: "Артикул" },
  { id: 2, label: "Описание" }
];

export const ORDERS_TABLE_HEAD = [
  { key: "id", label: "№ заказа", width: "100px" },
  { key: "paymentMethod", label: "Метод оплаты", width: "160px" },
  { key: "orderDate", label: "Дата заказа", width: "140px" },
  { key: "qty", label: "Кол-во, шт.", width: "140px" },
  { key: "totalPrice", label: "Сумма, руб", width: "140px" },
  { key: "status", label: "Статус заказа", width: "180px" }
] as const;

export const ORDERS_DETAILS_TABLE_HEAD: {
  key: keyof OrderDetailsItem;
  label: string;
  width?: string;
}[] = [
  { key: "brand", label: "Бренд", width: "140px" },
  { key: "article", label: "Артикул", width: "140px" },
  { key: "name", label: "Описание" },
  { key: "price", label: "Цена, руб.", width: "120px" },
  { key: "qtyItem", label: "Кол-во, шт.", width: "150px" },
  { key: "totalPrice", label: "Сумма, руб.", width: "140px" }
];
