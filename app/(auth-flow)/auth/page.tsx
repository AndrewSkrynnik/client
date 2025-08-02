"use client";

import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AuthTemplate } from "@/features/auth/components/AuthTemplate";

export const metadata: Metadata = {
  title: "Вход и регистрация | rotazap.ru",
  description:
    "Вход и регистрация в интернет-магазин автозапчастей rotazap.ru. Получите доступ к истории заказов, избранному и персональным предложениям."
};

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");

    if (token) {
      router.replace("/");
    }
  }, []);

  return <AuthTemplate />;
}
