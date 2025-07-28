import axios from "axios";

export interface CreateOrderItem {
  skuId: number;
  supplierId: number;
  qty: number;
  basePrice: number;
  descr: string;
}

export interface OrderItem {
  skuId: number;
  supplierId: number;
  qty: number;
  article: string;
  brand: string;
  descr: string;
  clientPrice: number;
  totalPrice: number;
}

export interface OrderResponse {
  id: number;
  createdAt: string;
  fullName?: string;
  address?: string;
  items: OrderItemResponse[];
  orderNumber: string; // Добавлено для соответствия интерфейсу OrderTableItem
}

export interface OrderItemResponse {
  skuId: number;
  supplierId: number;
  qty: number;
  article: string;
  brand: string;
  descr: string;
  clientPrice: number;
  statuses: {
    id: number;
    status: string;
    qty: number;
    createdAt: string;
  }[];
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const withCredentials = { withCredentials: true };

export const createOrder = async (
  items: CreateOrderItem[]
): Promise<OrderResponse> => {
  const payload = {
    items: items.map(item => ({
      ...item,
      basePrice: Number(item.basePrice), // на всякий случай приведение
      qty: Number(item.qty)
    }))
  };

  const res = await axios.post(`${API_URL}/orders`, payload, withCredentials);
  return res.data;
};

export const getOrders = async () => {
  const res = await axios.get(`${API_URL}/orders`, withCredentials);
  return res.data;
};
