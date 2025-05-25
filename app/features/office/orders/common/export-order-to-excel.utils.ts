import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

import { OrderDetailsItem } from "@/features/office/orders/types";

/**
 * Экспорт заказа в Excel
 * @param orderId — номер заказа
 * @param orderDate — дата заказа
 * @param address — адрес доставки
 * @param items — массив товаров в заказе
 */
export const exportOrderToExcel = (
  orderId: number,
  orderDate: Date,
  address: string,
  items: OrderDetailsItem[]
) => {
  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const worksheetData = [
    [`Заказ №${orderId}`],
    ["Дата заказа:", orderDate.toLocaleDateString("ru-RU")],
    ["Адрес доставки:", address],
    ["Сумма, руб.:", total],
    [],
    ["Бренд", "Деталь", "Артикул", "Цена, шт.", "Кол-во, шт.", "Сумма"],
    ...items.map(item => [
      item.brand,
      item.name,
      item.article,
      item.price,
      item.qtyItem,
      item.totalPrice
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Заказ");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  });

  saveAs(blob, `order-${orderId}.xlsx`);
};
