import { AuthHeader } from "@/features/auth/components/AuthHeader";

import { Footer } from "@/components/layout/footer/Footer";

export default function ConfirmationLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthHeader />
      <main className="justify-center">{children}</main>
      <Footer />
    </>
  );
}
