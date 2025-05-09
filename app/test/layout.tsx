export default function ConfirmationLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="justify-center">{children}</main>
    </>
  );
}
