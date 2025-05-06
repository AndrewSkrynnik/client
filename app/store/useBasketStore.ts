import { create } from "zustand";

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
