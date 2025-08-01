import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Явно загружаем только нужные переменные (опционально)
loadEnvConfig(process.cwd(), isDev);

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon-light.ico",
        permanent: false
      }
    ];
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  generateBuildId: () => String(Date.now()),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pubimg.nodacdn.net",
        port: "",
        pathname: "/**" // разрешить все пути
      }
    ]
  }
};

module.exports = withBundleAnalyzer(nextConfig);
