import { Metadata } from "next";

import { DashboardTemplate } from "@/features/dashboard/components/DashboardTemplate";

export const metadata: Metadata = {
  title: "Домашняя страница | Example.com",
  description: "Описание страницы",
  applicationName: "Example.com",
  generator: "Next.js"
};

export default function DashboardPage() {
  return (
    <section className="section">
      <DashboardTemplate />
    </section>
  );
}
