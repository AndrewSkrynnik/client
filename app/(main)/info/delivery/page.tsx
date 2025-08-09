import { Metadata } from "next";

import { DeliveryTemplate } from "@/features/info/components/DeliveryTemplate";

export const metadata: Metadata = {
  title: "Доставка | rotazap.ru",
  description:
    "Информация о способах и условиях доставки в интернет-магазине автозапчастей rotazap.ru: регионы, сроки, стоимость и службы доставки",
  openGraph: {
    title: "Доставка | rotazap.ru",
    description:
      "Информация о способах и условиях доставки в интернет-магазине автозапчастей rotazap.ru: регионы, сроки, стоимость и службы доставки",
    images: ["/opengraph-image?v=2"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Доставка | rotazap.ru",
    description:
      "Информация о способах и условиях доставки в интернет-магазине автозапчастей rotazap.ru: регионы, сроки, стоимость и службы доставки",
    images: ["/opengraph-image?v=2"]
  }
};

export default function DeliveryPage() {
  return <DeliveryTemplate />;
}
