import axios from "axios";

export interface CreateOrderItem {
  skuId: number;
  supplierId: number;
  qty: number;
}

export interface OrderItem {
  skuId: number;
  supplierId: number;
  qty: number;
  article: string;
  brand: string;
  description: string;
  clientPrice: number;
  totalPrice: number;
  statuses: {
    id: number;
    status: string;
    qty: number;
    createdAt: string;
  }[];
}

export interface OrderResponse {
  id: number;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const withCredentials = { withCredentials: true };

export const createOrder = async (
  items: CreateOrderItem[]
): Promise<OrderResponse> => {
  const res = await axios.post(`${API_URL}/orders`, { items }, withCredentials);
  return res.data;
};
export const getOrders = async () => {
  const res = await axios.get(`${API_URL}/orders`, withCredentials);
  return res.data;
};
