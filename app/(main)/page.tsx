import { Metadata } from "next";

import { HomeTemplate } from "@/features/home/components/HomeTemplate";

export const metadata: Metadata = {
  title: "Домашняя страница | Example.com",
  description: "Описание страницы",
  applicationName: "Example.com",
  generator: "Next.js"
};

export default function HomePage() {
  return (
    <section className="section">
      <HomeTemplate />
    </section>
  );
}
