import { Metadata } from "next";

import { ResetPasswordTemplate } from "@/features/password/components/ResetPasswordTemplate";

export const metadata: Metadata = {
  title: "Сброс пароля | rotazap.ru",
  description:
    "Страница сброса пароля на rotazap.ru. Предназначена для установки нового пароля пользователями, запросившими восстановление доступа."
};

export default function ResetPasswordPage() {
  return <ResetPasswordTemplate />;
}
