export const ordersTableColumns = [
  { key: "id", label: "№ заказа", width: "100px" },
  { key: "paymentMethod", label: "Метод оплаты", width: "160px" },
  { key: "orderDate", label: "Дата заказа", width: "140px" },
  { key: "qty", label: "Кол-во товаров", width: "140px" },
  { key: "totalPrice", label: "Сумма заказа", width: "140px" },
  { key: "status", label: "Статус заказа", width: "180px" }
] as const;
