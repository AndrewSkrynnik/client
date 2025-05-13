import { Metadata } from "next";

import { HomeTemplate } from "@/features/home/components/HomeTemplate";

/* TODO:тут вообще не нужна метадата? */
export const metadata: Metadata = {
  title: "Домашняя страница | rotazap.ru",
  description: "Описание страницы",
  applicationName: "rotazap.ru",
  generator: "Next.js"
};

export default function MainPage() {
  return (
    <>
      <HomeTemplate />
    </>
  );
}
