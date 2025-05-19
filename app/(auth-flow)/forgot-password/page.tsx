import { Metadata } from "next";

import { ForgotPasswordTemplate } from "@/features/password/components/ForgotPasswordTemplate";

export const metadata: Metadata = {
  title: "Восстановление пароля | rotazap.ru",
  description:
    "Страница восстановления пароля на rotazap.ru. Предназначена для запроса ссылки на сброс пароля через адрес электронной почты."
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordTemplate />;
}
