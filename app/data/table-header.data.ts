export type TableHeader = {
  id: number;
  label: string;
};

export const BASKET_TABLE: TableHeader[] = [
  { id: 0, label: "Бренд" },
  { id: 1, label: "Артикул" },
  { id: 2, label: "Описание" },
  { id: 3, label: "Цена, руб." },
  { id: 4, label: "Кол-во, шт." },
  { id: 5, label: "Сумма, руб. " },
  { id: 6, label: "" }, // Пустая ячейка для инпута
  { id: 7, label: "" } // Пустая ячейка для кнопки удаления
];
