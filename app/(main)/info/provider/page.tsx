import { Metadata } from "next";

import { ProviderTemplate } from "@/features/info/components/ProviderTemplate";

export const metadata: Metadata = {
  title: "Поставщикам | Rotazap",
  description:
    "Страница 'Поставщикам' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

export default function ProviderPage() {
  return <ProviderTemplate />;
}
