import { Metadata } from "next";
import { redirect } from "next/navigation";

import { HomeTemplate } from "@/features/home/components/HomeTemplate";

import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Поиск автозапчастей | rotazap.ru",
  description:
    "Быстрый поиск автозапчастей по артикулу на rotazap.ru. Уточнение по брендам, кроссам и оригинальным номерам. Поддержка OEM и ABCP API."
};

export default async function MainPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    redirect("/auth");
  }

  return <HomeTemplate />;
}
