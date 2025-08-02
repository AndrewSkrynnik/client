"use client";

import { getCookie } from "cookies-next";
import { Metadata } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { HomeTemplate } from "@/features/home/components/HomeTemplate";

export const metadata: Metadata = {
  title: "Поиск автозапчастей | rotazap.ru",
  description:
    "Быстрый поиск автозапчастей по артикулу на rotazap.ru. Уточнение по брендам, кроссам и оригинальным номерам. Поддержка OEM и ABCP API."
};

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      router.replace("/auth");
    }
  }, []);

  return <HomeTemplate />;
}
