export interface OrdersFilters {
  order_status?: string;
  date_range?: [Date | null, Date | null];
  article?: string; // ✅ Добавить это
}

export interface OrdersFilterFormProps {
  onFilter: (filters: OrdersFilters) => void;
  onReset: () => void;
}

export interface OrderDetailsItem {
  brand: string;
  name: string;
  article: string;
  price: number;
  qtyItem: number;
  totalPrice: number;
}

export interface OrderTableItem {
  id: number;
  paymentMethod: string;
  orderDate: Date;
  status: string;
  address: string;
  details: OrderDetailsItem[];
}

export interface OrdersTableProps {
  orders: OrderTableItem[];
}

export interface OrderFilters {
  order_status?: string;
  date_range?: [Date | null, Date | null];
  article?: string;
}
