"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { HomeTemplate } from "@/features/home/components/HomeTemplate";

export default function ProtectedMainPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      router.replace("/auth");
    }
  }, []);

  return <HomeTemplate />;
}
