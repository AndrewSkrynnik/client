import { Metadata } from "next";

import { AboutCompanyTemplate } from "@/features/info/components/AboutCompanyTemplate";

export const metadata: Metadata = {
  title: "О компании | Rotazap",
  description:
    "Страница 'О компании' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

export default function AboutCompanyPage() {
  return <AboutCompanyTemplate />;
}
