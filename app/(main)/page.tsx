import { Metadata } from "next";

import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Поиск автозапчастей | rotazap.ru",
  description:
    "Быстрый поиск автозапчастей по артикулу на rotazap.ru. Уточнение по брендам, кроссам и оригинальным номерам. Поддержка OEM и ABCP API."
};

// динамически импортируем клиентский компонент
const ProtectedMainPage = dynamic(() => import("./protected-page"), {
  ssr: false
});

export default function MainPage() {
  return <ProtectedMainPage />;
}
