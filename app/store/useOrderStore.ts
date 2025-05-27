import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useAuthStore } from "@/store/useAuthStore";

import { generateOrderId } from "@/utils/generate-order-id";

export interface OrderItem {
  brand: string;
  article: string;
  name: string;
  price: number;
  qtyItem: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderDate: Date;
  address: string;
  fullName: string;
  paymentMethod: string;
  status: string;
  details: OrderItem[];
  totalPrice: number;
}

interface OrderState {
  orders: Order[];
  createOrder: (details: OrderItem[], totalPrice: number) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      createOrder: (details, totalPrice) => {
        const authUser = useAuthStore.getState().user;

        if (!authUser?.address || !authUser.fullName) {
          throw new Error(
            "Невозможно оформить заказ: в профиле отсутствует имя или адрес"
          );
        }

        const id = generateOrderId(get().orders.map(o => o.id));

        const order: Order = {
          id,
          orderDate: new Date(),
          address: authUser.address,
          fullName: authUser.fullName,
          paymentMethod: "Наличные",
          status: "Новый заказ",
          details,
          totalPrice
        };

        set({ orders: [...get().orders, order] });
      }
    }),
    {
      name: "order-storage",
      version: 1
    }
  )
);
