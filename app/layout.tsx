import { Metadata } from "next";
import { ReactNode } from "react";

import { ibm, roboto } from "@/styles/fonts/fonts";
import "@/styles/globals.css";

import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "rotazap.ru",
  icons: [
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
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  console.log("✅ ENV_FILE:", process.env.ENV_FILE);

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
