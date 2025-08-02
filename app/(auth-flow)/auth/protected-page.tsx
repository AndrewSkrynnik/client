"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AuthTemplate } from "@/features/auth/components/AuthTemplate";

export default function ProtectedAuthPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      router.replace("/");
    }
  }, []);

  return <AuthTemplate />;
}
