"use client";

import { usePathname } from "next/navigation";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return <main className={isHome ? "justify-center" : ""}>{children}</main>;
};
