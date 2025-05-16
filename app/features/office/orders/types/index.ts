// Типизация формы фильтра
export interface OrdersFilterForm {
  article: string;
  order_status: string;
  date_range: [Date | null, Date | null];
}

/* Типизация даты в ордер */
export interface Order {
  id: number;
  article: string;
  source: string;
  date: string; // "YYYY-MM-DD"
  price: number;
  quantity: number;
  total: number;
  status: string;
}
