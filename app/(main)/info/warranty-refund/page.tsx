import { Metadata } from "next";

import { WarrantyRefundTemplate } from "@/features/info/components/WarrantyRefundTemplate";

export const metadata: Metadata = {
  title: "Гарантия и возвраты | rotazap.ru",
  description:
    "Правила гарантии и возврата товаров в интернет-магазине rotazap.ru: сроки, порядок оформления, условия обмена и возврата автозапчастей",
  openGraph: {
    title: "Гарантия и возвраты | rotazap.ru",
    description:
      "Правила гарантии и возврата товаров в интернет-магазине rotazap.ru: сроки, порядок оформления, условия обмена и возврата автозапчастей",
    images: ["https://rotazap.ru/opengraph-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Гарантия и возвраты | rotazap.ru",
    description:
      "Правила гарантии и возврата товаров в интернет-магазине rotazap.ru: сроки, порядок оформления, условия обмена и возврата автозапчастей",
    images: ["https://rotazap.ru/opengraph-image.png"]
  }
};

export default function WarrantyRefundPage() {
  return <WarrantyRefundTemplate />;
}
