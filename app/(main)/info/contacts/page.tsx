import { Metadata } from "next";

import { ContactsTemplate } from "@/features/info/components/ContactsTemplate";

export const metadata: Metadata = {
  title: "Контакты | rotazap.ru",
  description:
    "Контактная информация интернет-магазина rotazap.ru: адрес, телефон, электронная почта и форма обратной связи",
  openGraph: {
    title: "Контакты | rotazap.ru",
    description:
      "Контактная информация интернет-магазина rotazap.ru: адрес, телефон, электронная почта и форма обратной связи",
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты | rotazap.ru",
    description:
      "Контактная информация интернет-магазина rotazap.ru: адрес, телефон, электронная почта и форма обратной связи",
    images: ["/opengraph-image"]
  }
};

export default function ContactsPage() {
  return <ContactsTemplate />;
}
