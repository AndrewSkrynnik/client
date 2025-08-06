import { Metadata } from "next";

import { ProtectedAuthPage } from "@/(auth-flow)/auth/protected-page";

export const metadata: Metadata = {
  title: "Вход и регистрация | rotazap.ru",
  description:
    "Вход и регистрация в интернет-магазин автозапчастей rotazap.ru. Получите доступ к истории заказов, избранному и персональным предложениям",
  openGraph: {
    title: "Вход и регистрация | rotazap.ru",
    description:
      "Вход и регистрация в интернет-магазин автозапчастей rotazap.ru. Получите доступ к истории заказов, избранному и персональным предложениям",
    images: ["https://rotazap.ru/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Вход и регистрация | rotazap.ru",
    description:
      "Вход и регистрация в интернет-магазин автозапчастей rotazap.ru. Получите доступ к истории заказов, избранному и персональным предложениям",
    images: ["https://rotazap.ru/opengraph-image"]
  }
};

export default function AuthPage() {
  return <ProtectedAuthPage />;
}
