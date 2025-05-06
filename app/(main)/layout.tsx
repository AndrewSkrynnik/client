import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";

import "@/styles/globals.css";

export default async function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
