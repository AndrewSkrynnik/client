import { Metadata } from "next";

import { DeliveryTemplate } from "@/features/info/components/DeliveryTemplate";

export const metadata: Metadata = {
  title: "Доставка | Rotazap",
  description:
    "Страница 'Доставка' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

export default function DeliveryPage() {
  return <DeliveryTemplate />;
}
