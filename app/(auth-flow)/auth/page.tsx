import { Metadata } from "next";

import { AuthTemplate } from "@/features/auth/components/AuthTemplate";

export const metadata: Metadata = {
  title: "Вход и регистрация | rotazap.ru",
  description:
    "Вход и регистрация в интернет-магазин автозапчастей rotazap.ru. Получите доступ к истории заказов, избранному и персональным предложениям."
};

export default function AuthPage() {
  return <AuthTemplate />;
}
