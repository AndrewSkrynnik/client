// app/head.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  // fallback — обязательно
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

export default function Head() {
  return (
    <>
      {/* на всякий случай продублируем */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="icon"
        href="/favicon-light.ico"
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        href="/favicon-dark.ico"
        media="(prefers-color-scheme: dark)"
      />
    </>
  );
}
