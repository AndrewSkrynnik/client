import { Metadata } from "next";

import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Вход и регистрация | rotazap.ru",
  description:
    "Вход и регистрация в интернет-магазин автозапчастей rotazap.ru. Получите доступ к истории заказов, избранному и персональным предложениям."
};

const ProtectedAuthPage = dynamic(() => import("./protected-page"), {
  ssr: false
});

export default function AuthPage() {
  return <ProtectedAuthPage />;
}
