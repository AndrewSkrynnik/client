import { Metadata } from "next";
import { ReactNode } from "react";

import { ibm, roboto } from "@/styles/fonts/fonts";
import "@/styles/globals.css";

import ClientLayout from "./ClientLayout";
import { DynamicFavicon } from "@/DynamicFavicon";

export const dynamic = "force-static";

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
    icon: "/favicon.ico",
    other: [
      {
        rel: "icon",
        url: "/favicon-light.ico",
        media: "(prefers-color-scheme: light)"
      },
      {
        rel: "icon",
        url: "/favicon-dark.ico",
        media: "(prefers-color-scheme: dark)"
      }
    ]
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
        <DynamicFavicon />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
