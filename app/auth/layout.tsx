import { ReactNode } from "react";

import { Footer } from "@/components/layout/footer/Footer";
import { HeaderTop } from "@/components/layout/header/HeaderTop";

export default function AuthLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <HeaderTop />
      <main className="justify-center">{children}</main>
      <Footer />
    </>
  );
}
