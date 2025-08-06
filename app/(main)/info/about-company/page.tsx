import { Metadata } from "next";

import { AboutCompanyTemplate } from "@/features/info/components/AboutCompanyTemplate";

export const metadata: Metadata = {
  title: "О компании | rotazap.ru",
  description:
    "Страница с информацией о компании rotazap.ru — интернет-магазине автозапчастей для иномарок. Общие сведения и принципы работы",
  openGraph: {
    title: "О компании | rotazap.ru",
    description:
      "Страница с информацией о компании rotazap.ru — интернет-магазине автозапчастей для иномарок. Общие сведения и принципы работы",
    images: ["https://rotazap.ru/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "О компании | rotazap.ru",
    description:
      "Страница с информацией о компании rotazap.ru — интернет-магазине автозапчастей для иномарок. Общие сведения и принципы работы",
    images: ["https://rotazap.ru/opengraph-image"]
  }
};

export default function AboutCompanyPage() {
  return <AboutCompanyTemplate />;
}
