export type TableHeader = {
  id: number;
  label: string;
};

export const BASKET_TABLE_HEAD: TableHeader[] = [
  { id: 0, label: "Бренд" },
  { id: 1, label: "Артикул" },
  { id: 2, label: "Описание" },
  { id: 3, label: "Цена, руб." },
  { id: 4, label: "Кол-во, шт." },
  { id: 5, label: "Сумма, руб." },
  { id: 6, label: "" },
  { id: 7, label: "" }
];
export const SEARCH_RESULT_TABLE_HEAD: TableHeader[] = [
  { id: 0, label: "Бренд" },
  { id: 1, label: "Артикул" },
  { id: 2, label: "Описание" },
  { id: 3, label: "Инфо" },
  { id: 4, label: "Цена, руб." },
  { id: 5, label: "Наличие, шт." },
  { id: 6, label: "Кол-во / сумма" },
  { id: 7, label: "" }
];
