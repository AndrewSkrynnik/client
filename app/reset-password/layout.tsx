import { Footer } from "@/components/layout/footer/Footer";
import { HeaderTop } from "@/components/layout/header/HeaderTop";

export default function ResetPasswordLayout({
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
