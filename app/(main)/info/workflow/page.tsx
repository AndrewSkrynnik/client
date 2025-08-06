import { Metadata } from "next";

import { WorkflowTemplate } from "@/features/info/components/WorkflowTemplate";

export const metadata: Metadata = {
  title: "Электронный документооборот | rotazap.ru",
  description:
    "Информация об использовании электронного документооборота (ЭДО) в интернет-магазине rotazap.ru: порядок подключения, форматы и преимущества для контрагентов",
  openGraph: {
    title: "Электронный документооборот | rotazap.ru",
    description:
      "Информация об использовании электронного документооборота (ЭДО) в интернет-магазине rotazap.ru: порядок подключения, форматы и преимущества для контрагентов",
    images: ["https://rotazap.ru/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Электронный документооборот | rotazap.ru",
    description:
      "Информация об использовании электронного документооборота (ЭДО) в интернет-магазине rotazap.ru: порядок подключения, форматы и преимущества для контрагентов",
    images: ["https://rotazap.ru/opengraph-image"]
  }
};

export default function WorkflowPage() {
  return <WorkflowTemplate />;
}
