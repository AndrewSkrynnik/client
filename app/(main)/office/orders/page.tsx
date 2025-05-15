import { Metadata } from "next";

import { OrdersTemplate } from "@/features/office/orders/components/OrdersTemplate";

export const metadata: Metadata = {
  title: "Заказы | Rotazap",
  description:
    "Страница 'Заказы' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

export default function OrdersPage() {
  return <OrdersTemplate />;
}
