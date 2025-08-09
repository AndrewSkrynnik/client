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
    images: ["/opengraph-image?v=2"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Оптовым покупателям | rotazap.ru",
    description:
      "Информация для оптовых покупателей интернет-магазина rotazap.ru: условия сотрудничества, объёмы заказов, скидки и преимущества для бизнеса",
    images: ["/opengraph-image?v=2"]
  }
};

export default function WholesalePage() {
  return <WholesaleTemplate />;
}
