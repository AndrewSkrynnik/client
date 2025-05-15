import { Metadata } from "next";

import { ConfirmationTemplate } from "@/features/confirmation/components/ConfirmationTemplate";

export const metadata: Metadata = {
  title: "Авторизация | Rotazap",
  description:
    "Страница авторизации в интернет-магазине автомобильных запчастей для иномарок Rotazap",
  applicationName: "rotazap.ru",
  generator: "Next.js"
};

export default function ConfirmationPage() {
  return (
    <>
      <ConfirmationTemplate />
    </>
  );
}
