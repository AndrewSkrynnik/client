// Тип формы фильтра заказов
export interface OrdersFilterValues {
  article: string;
  order_status: string;
  date_range: [Date | null, Date | null];
}

// Пропсы компонента формы фильтра
export interface OrdersFilterFormProps {
  onFilter: (filters: OrdersFilterValues) => void;
  onReset: () => void;
}

// Пропсы компонента пагинации заказов
export interface OrdersPaginationProps {
  totalItems: number;
  rowsPerPage: number;
  currentPage: number;
  onChange: (page: number) => void;
}
// Модель одного заказа
export interface OrderTableItem {
  id: string; // Уникальный идентификатор
  article: string; // Артикул детали
  source: string; // Источник (поставщик)
  date: string; // Дата заказа
  price: string; // Цена за единицу
  quantity: number; // Количество
  total: string; // Общая сумма
  status: string; // Статус заказа
}

// Пропсы для компонента таблицы заказов
export interface OrdersTableProps {
  orders: OrderTableItem[];
}
