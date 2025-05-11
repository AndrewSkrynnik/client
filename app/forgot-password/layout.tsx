import { Footer } from "@/components/layout/footer/Footer";
import { HeaderTop } from "@/components/layout/header/HeaderTop";

export default function ForgotPasswordLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderTop />
      <main className="justify-center">{children}</main>
      <Footer />
    </>
  );
}
