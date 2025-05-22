import { Metadata } from "next";

import { BasketTemplate } from "@/features/office/basket/components/BasketTemplate";

export const metadata: Metadata = {
  title: "Корзина | rotazap.ru",
  description:
    "Корзина покупок на сайте rotazap.ru: список выбранных автозапчастей, цены, количество и оформление заказа."
};
export default function BasketPage() {
  return <BasketTemplate />;
}
