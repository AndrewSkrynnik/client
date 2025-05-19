import { ReactNode } from "react";

import { Footer } from "@/components/layout/footer/Footer";
import { HeaderTop } from "@/components/layout/header/HeaderTop";

export default function AuthFlowLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <header>
        <HeaderTop />
      </header>
      <main className="justify-center">{children}</main>
      <Footer />
    </>
  );
}
