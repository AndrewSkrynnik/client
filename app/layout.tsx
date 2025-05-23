import { Metadata } from "next";
import { ReactNode } from "react";

import { ibm, roboto } from "@/styles/fonts/fonts";
import "@/styles/globals.css";

import ClientLayout from "./ClientLayout";
import { DynamicFavicon } from "@/DynamicFavicon";

export const metadata: Metadata = {
  title: "rotazap.ru",
  description:
    "rotazap.ru — интернет-магазин автозапчастей с быстрым поиском по артикулу, бренду, OEM и кросс-номерам. Онлайн-наличие и поддержка ABCP API.",
  applicationName: "rotazap.ru",
  generator: "Next.js",
  keywords: [
    "автозапчасти",
    "поиск деталей",
    "артикул",
    "OEM",
    "аналог",
    "запчасти онлайн",
    "rotazap",
    "ABCP API"
  ],
  authors: [{ name: "rotazap.ru", url: "https://rotazap.ru" }],
  metadataBase: new URL("https://rotazap.ru"),
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico" // fallback
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${roboto.variable} ${ibm.variable} antialiased`}
    >
      <body className="app">
        <DynamicFavicon />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
