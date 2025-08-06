import { Metadata } from "next";

import { ConfirmationTemplate } from "@/features/confirmation/components/ConfirmationTemplate";

export const metadata: Metadata = {
  title: "Подтверждение аккаунта | rotazap.ru",
  description:
    "Страница подтверждения аккаунта на rotazap.ru. Доступ к личному кабинету предоставляется после заключения договора и активации учетной записи",
  openGraph: {
    title: "Подтверждение аккаунта | rotazap.ru",
    description:
      "Страница подтверждения аккаунта на rotazap.ru. Доступ к личному кабинету предоставляется после заключения договора и активации учетной записи",
    images: ["https://rotazap.ru/opengraph-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Подтверждение аккаунта | rotazap.ru",
    description:
      "Страница подтверждения аккаунта на rotazap.ru. Доступ к личному кабинету предоставляется после заключения договора и активации учетной записи",
    images: ["https://rotazap.ru/opengraph-image.png"]
  }
};

export default function ConfirmationPage() {
  return <ConfirmationTemplate />;
}
