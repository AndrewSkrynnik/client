import { Metadata } from "next";

import { ContactsTemplate } from "@/features/info/components/ContactsTemplate";

export const dynamic = "force-static"; // без динамики
export const revalidate = 3600; // чтобы был SSG (можно больше/меньше)

export const metadata: Metadata = {
  title: "Контакты | rotazap.ru",
  description:
    "Контактная информация интернет-магазина rotazap.ru: адрес, телефон, электронная почта и форма обратной связи",
  openGraph: {
    title: "Контакты | rotazap.ru",
    description:
      "Контактная информация интернет-магазина rotazap.ru: адрес, телефон, электронная почта и форма обратной связи",
    images: ["/opengraph-image?v=2"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты | rotazap.ru",
    description:
      "Контактная информация интернет-магазина rotazap.ru: адрес, телефон, электронная почта и форма обратной связи",
    images: ["/opengraph-image?v=2"]
  }
};

export default function ContactsPage() {
  return <ContactsTemplate />;
}
