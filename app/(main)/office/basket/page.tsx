import { Metadata } from "next";

import { BasketTemplate } from "@/features/basket/components/BasketTemplate";

/* TODO: поменять метадату */
export const metadata: Metadata = {
  title: "Корзина | Rotazap",
  description:
    "Страница 'Учетная запись ' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

export default function BasketPage() {
  return <BasketTemplate />;
}
