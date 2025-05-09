import { Metadata } from "next";

import { Mail } from "@/components/mail";

export const metadata: Metadata = {
  title: "Авторизация | Rotazap",
  description:
    "Страница авторизации в интернет-магазине автомобильных запчастей для иномарок Rotazap",
  applicationName: "rotazap.ru",
  generator: "Next.js"
};

export default function TestPage() {
  return (
    <>
      <Mail />
    </>
  );
}
