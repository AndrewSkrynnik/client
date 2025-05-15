import { Metadata } from "next";

import { ResetPasswordTemplate } from "@/features/password/components/ResetPasswordTemplate";

export const metadata: Metadata = {
  title: "Авторизация | Rotazap",
  description:
    "Страница авторизации в интернет-магазине автомобильных запчастей для иномарок Rotazap",
  applicationName: "rotazap.ru",
  generator: "Next.js"
};

export default function ResetPasswordPage() {
  return (
    <>
      <ResetPasswordTemplate />
    </>
  );
}
