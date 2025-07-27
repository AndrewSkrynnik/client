import { Metadata } from "next";
import { redirect } from "next/navigation";

import { AuthTemplate } from "@/features/auth/components/AuthTemplate";

import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Вход и регистрация | rotazap.ru",
  description:
    "Вход и регистрация в интернет-магазин автозапчастей rotazap.ru. Получите доступ к истории заказов, избранному и персональным предложениям."
};

export default async function AuthPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (accessToken) {
    redirect("/"); // если уже авторизован, редиректим
  }

  return <AuthTemplate />;
}
