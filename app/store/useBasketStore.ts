import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BasketItem = {
  brand: string;
  number: string;
  description: string;
  price: number;
  count: number;
  totalPrice: number;
};

interface BasketState {
  items: BasketItem[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;

  addItem: (item: Omit<BasketItem, "totalPrice">) => void;
  removeItem: (number: string, brand: string) => void;
  updateCount: (number: string, brand: string, count: number) => void;
  clearCart: () => void;

  getTotalCount: () => number;
  getTotalPrice: () => number;
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: value => set({ hasHydrated: value }),

      addItem: item => {
        console.log("[cart:addItem]", item);
        const existing = get().items.find(
          i => i.number === item.number && i.brand === item.brand
        );

        if (existing) {
          console.log("[cart:addItem] item exists, updating...");
          set({
            items: get().items.map(i =>
              i.number === item.number && i.brand === item.brand
                ? {
                    ...i,
                    count: i.count + item.count,
                    totalPrice: (i.count + item.count) * i.price
                  }
                : i
            )
          });
        } else {
          console.log("[cart:addItem] item does not exist, adding new...");
          set({
            items: [
              ...get().items,
              {
                ...item,
                totalPrice: item.count * item.price
              }
            ]
          });
        }

        console.log("[cart:afterAdd]", get().items);
      },

      removeItem: (number, brand) => {
        set({
          items: get().items.filter(
            i => !(i.number === number && i.brand === brand)
          )
        });
      },

      updateCount: (number, brand, count) => {
        set({
          items: get().items.map(i =>
            i.number === number && i.brand === brand
              ? {
                  ...i,
                  count,
                  totalPrice: count * i.price
                }
              : i
          )
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalCount: () => get().items.reduce((acc, i) => acc + i.count, 0),

      getTotalPrice: () => get().items.reduce((acc, i) => acc + i.totalPrice, 0)
    }),
    {
      name: "cart-storage",
      version: 1,
      onRehydrateStorage: () => state => {
        console.log("[cart:persist] hydration complete");
        state?.setHasHydrated(true);
      }
    }
  )
);

/* import { create } from "zustand";

import axiosInstance from "@/libs/axios";

import { BasketItem, BasketState } from "@/store/types";

export const useBasketStore = create<BasketState>(set => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  loadBasket: async userId => {
    try {
      const response = await axiosInstance.get(`/basket/user/${userId}`);
      const items = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.qty
      }));

      const totalQuantity: number = items.reduce(
        (acc: number, item: BasketItem) => acc + item.quantity,
        0
      );

      const totalPrice: number = items.reduce(
        (acc: number, item: BasketItem) => acc + item.price * item.quantity,
        0
      );

      set({
        items,
        totalQuantity,
        totalPrice
      });
    } catch (error) {
      console.error("Ошибка загрузки корзины:", error);
    }
  }
}));
 */
