import { Metadata } from "next";

import { ForgotPasswordTemplate } from "@/features/password/components/ForgotPasswordTemplate";

export const metadata: Metadata = {
  title: "Авторизация | Rotazap",
  description:
    "Страница авторизации в интернет-магазине автомобильных запчастей для иномарок Rotazap",
  applicationName: "rotazap.ru",
  generator: "Next.js"
};

export default function ForgotPasswordPage() {
  return (
    <>
      <ForgotPasswordTemplate />
    </>
  );
}
