import { Metadata } from "next";

import { WholesaleTemplate } from "@/features/info/components/WholesaleTemplate";

export const metadata: Metadata = {
  title: "Оптовым покупателям | Rotazap",
  description:
    "Страница 'Оптовым покупателям' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

export default function WholesalePage() {
  return <WholesaleTemplate />;
}
