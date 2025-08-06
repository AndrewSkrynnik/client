import { Metadata } from "next";
import { ReactNode } from "react";

import { ibm, roboto } from "@/styles/fonts/fonts";
import "@/styles/globals.css";

import ClientLayout from "./ClientLayout";

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
  verification: {
    google: "tfpPQmMVyjKmQCpESNPXZRgwEzkrY72uxilLWbPSC_M",
    other: {
      "yandex-verification": "76be64e45a69686b"
    }
  },
  icons: {
    icon: [
      {
        url: "/icons/icon-512.png",
        type: "image/png",
        sizes: "512x512"
      },
      {
        url: "/icons/icon-192.png",
        type: "image/png",
        sizes: "192x192"
      }
    ],
    apple: [
      {
        url: "/icons/icon-192.png",
        sizes: "192x192"
      }
    ],
    shortcut: "/icons/favicon.ico"
  }
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
