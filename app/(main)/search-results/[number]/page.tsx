import { Metadata } from "next";

import { SearchResultTemplate } from "@/features/search/components/SearchResultTemplate";

export const metadata: Metadata = {
  title: "Результаты поиска | rotazap.ru",
  description:
    "Первый этап поиска на rotazap.ru — отображение найденных брендов и артикулов по введённому номеру. Поддержка OEM, кросс-номеров и аналогов."
};

export default function SearchResultsPage() {
  return <SearchResultTemplate />;
}
