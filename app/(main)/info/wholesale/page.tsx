import { Metadata } from "next";

import { WholesaleTemplate } from "@/features/info/components/WholesaleTemplate";

export const metadata: Metadata = {
  title: "Оптовым покупателям | rotazap.ru",
  description:
    "Информация для оптовых покупателей интернет-магазина rotazap.ru: условия сотрудничества, объёмы заказов, скидки и преимущества для бизнеса",
  openGraph: {
    title: "Оптовым покупателям | rotazap.ru",
    description:
      "Информация для оптовых покупателей интернет-магазина rotazap.ru: условия сотрудничества, объёмы заказов, скидки и преимущества для бизнеса",
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Оптовым покупателям | rotazap.ru",
    description:
      "Информация для оптовых покупателей интернет-магазина rotazap.ru: условия сотрудничества, объёмы заказов, скидки и преимущества для бизнеса",
    images: ["/opengraph-image"]
  }
};

export default function WholesalePage() {
  return <WholesaleTemplate />;
}
