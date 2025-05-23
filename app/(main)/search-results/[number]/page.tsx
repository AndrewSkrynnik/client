import { Metadata } from "next";

import { SearchTemplate } from "@/features/search/components/SearchTemplate";

export const metadata: Metadata = {
  title: "Результаты поиска | rotazap.ru",
  description:
    "Первый этап поиска на rotazap.ru — отображение найденных брендов и артикулов по введённому номеру. Поддержка OEM, кросс-номеров и аналогов."
};

export default function SearchResultsPage() {
  return <SearchTemplate />;
}
