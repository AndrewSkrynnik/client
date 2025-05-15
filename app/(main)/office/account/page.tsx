import { Metadata } from "next";

import { AccountTemplate } from "@/features/office/account/components/AccountTemplate";

export const metadata: Metadata = {
  title: "Учетная запись | Rotazap",
  description:
    "Страница 'Учетная запись ' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

export default function AccountPage() {
  return <AccountTemplate />;
}
