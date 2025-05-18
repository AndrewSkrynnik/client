import { ReactNode } from "react";

import { Footer } from "@/components/layout/footer/Footer";
import { HeaderTop } from "@/components/layout/header/HeaderTop";

import "@/styles/globals.css";

import { LayoutWrapper } from "./LayoutWrapper";

export default async function MainLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <HeaderTop />
      <LayoutWrapper>{children}</LayoutWrapper>
      <Footer />
    </>
  );
}
