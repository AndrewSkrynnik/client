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
  },
  openGraph: {
    title: "rotazap.ru – интернет-магазин автозапчастей",
    description:
      "Быстрый поиск автозапчастей по артикулу, бренду, OEM и кросс-номерам. Поддержка ABCP API. Онлайн-наличие. Оформление заказов напрямую.",
    url: "https://rotazap.ru",
    siteName: "rotazap.ru",
    images: [
      {
        url: "https://rotazap.ruhttps://rotazap.ru/opengraph-image", // ← путь к картинке, которую ты генерируешь
        width: 1200,
        height: 630,
        alt: "rotazap.ru – интернет-магазин автозапчастей",
        type: "image/png"
      }
    ],
    locale: "ru_RU",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "rotazap.ru – интернет-магазин автозапчастей",
    description:
      "Поиск деталей по артикулу, бренду и кроссам. Поддержка ABCP API. Онлайн-наличие.",
    images: ["https://rotazap.ruhttps://rotazap.ru/opengraph-image"]
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
