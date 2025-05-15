import { Metadata } from "next";

import { AuthTemplate } from "@/features/auth/components/AuthTemplate";

export const metadata: Metadata = {
  title: "Авторизация | Rotazap",
  description:
    "Страница авторизации в интернет-магазине автомобильных запчастей для иномарок Rotazap",
  applicationName: "rotazap.ru",
  generator: "Next.js"
};

export default function AuthPage() {
  return (
    <>
      <AuthTemplate />
    </>
  );
}
