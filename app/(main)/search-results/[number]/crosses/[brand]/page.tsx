import { Metadata } from "next";

import { SearchCrossesTemplate } from "@/features/search/components/SearchCrossesTemplate";

export const metadata: Metadata = {
  title: "Результаты поиска | rotazap.ru",
  description:
    "Второй этап поиска на rotazap.ru — отображение найденных брендов и артикулов по введённому номеру. Поддержка OEM, кросс-номеров и аналогов."
};

export default function SearchCrossesPage() {
  return <SearchCrossesTemplate />;
}
