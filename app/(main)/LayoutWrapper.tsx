"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { HeaderBottom } from "@/components/layout/header/HeaderBottom";

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const hideHeaderBottom =
    pathname.startsWith("/info/*") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/confirmation");

  return (
    <>
      {!hideHeaderBottom && <HeaderBottom />}
      <main className={isHome ? "justify-center" : ""}>{children}</main>
    </>
  );
};
