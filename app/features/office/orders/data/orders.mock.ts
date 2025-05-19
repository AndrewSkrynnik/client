import { orderStatus } from "@/features/office/orders/data/order-status-.data";
import {
  OrderDetailsItem,
  OrderTableItem
} from "@/features/office/orders/types";

// Генератор детальных позиций
const generateDetails = (seed: number): OrderDetailsItem[] => {
  const brands = ["BOSCH", "MANN", "FEBI", "NGK", "SACHS"];
  const items = ["Свеча", "Фильтр", "Амортизатор", "Диск", "Ремень"];

  const count = 1 + (seed % 3); // от 1 до 3 позиций

  return Array.from({ length: count }, (_, i) => {
    const qty = 1 + ((i + seed) % 5);
    const price = 500 + ((i + seed) % 4) * 300;

    return {
      brand: brands[(i + seed) % brands.length],
      name: `${items[(i + seed) % items.length]} №${i + 1}`,
      article: `ART-${seed}${i}`,
      price,
      qtyItem: qty,
      totalPrice: price * qty
    };
  });
};

export const orderMocks: OrderTableItem[] = Array.from(
  { length: 20 },
  (_, i) => ({
    id: 100 + i,
    paymentMethod: i % 2 === 0 ? "Наличные" : "Безнал.",
    orderDate: new Date(2025, 4, i + 1), // Месяц 4 = май (0-индекс)
    status: orderStatus[i % orderStatus.length].title,
    details: generateDetails(i)
  })
);
