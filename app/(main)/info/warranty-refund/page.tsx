import { Metadata } from "next";

import { WarrantyRefundTemplate } from "@/features/info/components/WarrantyRefundTemplate";

export const metadata: Metadata = {
  title: "Гарантия и возвраты | Rotazap",
  description:
    "Страница 'Гарантия и возвраты' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

export default function WarrantyRefundPage() {
  return <WarrantyRefundTemplate />;
}
