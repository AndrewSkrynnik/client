import { Metadata } from "next";

import { WorkflowTemplate } from "@/features/info/components/WorkflowTemplate";

export const metadata: Metadata = {
  title: "ЭДО | Rotazap",
  description:
    "Страница 'Электронный документооборот' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

export default function WorkflowPage() {
  return <WorkflowTemplate />;
}
