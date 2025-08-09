import { Metadata } from "next";

import { ProviderTemplate } from "@/features/info/components/ProviderTemplate";

export const metadata: Metadata = {
  title: "Поставщикам | rotazap.ru",
  description:
    "Информация для поставщиков интернет-магазина rotazap.ru: условия сотрудничества, требования к ассортименту и форма обратной связи",
  openGraph: {
    title: "Поставщикам | rotazap.ru",
    description:
      "Информация для поставщиков интернет-магазина rotazap.ru: условия сотрудничества, требования к ассортименту и форма обратной связи",
    images: ["/opengraph-image?v=2"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Поставщикам | rotazap.ru",
    description:
      "Информация для поставщиков интернет-магазина rotazap.ru: условия сотрудничества, требования к ассортименту и форма обратной связи",
    images: ["/opengraph-image?v=2"]
  }
};

export default function ProviderPage() {
  return <ProviderTemplate />;
}
