import { Metadata } from "next";

import { ContactsTemplate } from "@/features/info/components/ContactsTemplate";

export const metadata: Metadata = {
  title: "Контакты | Rotazap",
  description:
    "Страница 'Контакты' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

export default function ContactsPage() {
  return <ContactsTemplate />;
}
