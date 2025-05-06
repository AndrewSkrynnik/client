import { Metadata } from "next";

import { AboutTemplate } from "@/features/about/components/AboutTemplate";

export const metadata: Metadata = {
  title: "Домашняя страница | Example.com",
  description: "Описание страницы",
  applicationName: "Example.com",
  generator: "Next.js"
};

export default function AboutPage() {
  return (
    <section className="section">
      <AboutTemplate />
    </section>
  );
}
