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
    images: ["/opengraph-image?v=2"]
  },
  twitter: {
    card: "summary_large_image",
    title: "О компании | rotazap.ru",
    description:
      "Страница с информацией о компании rotazap.ru — интернет-магазине автозапчастей для иномарок. Общие сведения и принципы работы",
    images: ["/opengraph-image?v=2"]
  }
};

export default function AboutCompanyPage() {
  return <AboutCompanyTemplate />;
}
