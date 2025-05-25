import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BasketItem = {
  brand: string;
  number: string;
  description: string;
  price: number;
  count: number;
  totalPrice: number;
  stock: number;
  selected?: boolean;
};
interface BasketState {
  items: BasketItem[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;

  // старые
  addItem: (item: Omit<BasketItem, "totalPrice">) => void;
  removeItem: (number: string, brand: string) => void;
  updateCount: (number: string, brand: string, count: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
  selectItem: (number: string, brand: string, selected: boolean) => void;
  selectAll: (selected: boolean) => void;
  removeSelectedItems: () => void;

  // новые
  incrementItemCount: (item: Omit<BasketItem, "totalPrice">) => void;
  decrementItemCount: (number: string, brand: string) => void;
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: value => set({ hasHydrated: value }),

      addItem: item => {
        const existing = get().items.find(
          i => i.number === item.number && i.brand === item.brand
        );

        if (existing) {
          const newCount = Math.min(
            existing.count + item.count,
            existing.stock
          );
          set({
            items: get().items.map(i =>
              i.number === item.number && i.brand === item.brand
                ? {
                    ...i,
                    count: newCount,
                    totalPrice: newCount * i.price
                  }
                : i
            )
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                ...item,
                count: Math.min(item.count, item.stock),
                totalPrice: Math.min(item.count, item.stock) * item.price
              }
            ]
          });
        }
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
                  count: Math.min(count, i.stock),
                  totalPrice: Math.min(count, i.stock) * i.price
                }
              : i
          )
        });
      },

      selectItem: (number, brand, selected) =>
        set(state => ({
          items: state.items.map(item =>
            item.number === number && item.brand === brand
              ? { ...item, selected }
              : item
          )
        })),

      selectAll: selected =>
        set(state => ({
          items: state.items.map(item => ({ ...item, selected }))
        })),

      clearCart: () => set({ items: [] }),

      getTotalCount: () => get().items.reduce((acc, i) => acc + i.count, 0),

      getTotalPrice: () =>
        parseFloat(
          get()
            .items.reduce((acc, i) => acc + i.totalPrice, 0)
            .toFixed(2)
        ),
      /* Удаление товара после оформление заказа */
      removeSelectedItems: () => {
        set(state => ({
          items: state.items.filter(item => !item.selected)
        }));
      },

      incrementItemCount: (item: Omit<BasketItem, "totalPrice">) => {
        const existing = get().items.find(
          i => i.number === item.number && i.brand === item.brand
        );

        if (existing) {
          const newCount = Math.min(existing.count + 1, existing.stock);
          set({
            items: get().items.map(i =>
              i.number === item.number && i.brand === item.brand
                ? {
                    ...i,
                    count: newCount,
                    totalPrice: newCount * i.price
                  }
                : i
            )
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                ...item,
                count: 1,
                totalPrice: item.price
              }
            ]
          });
        }
      },
      decrementItemCount: (number: string, brand: string) => {
        const existing = get().items.find(
          i => i.number === number && i.brand === brand
        );

        if (!existing) return;

        if (existing.count <= 1) {
          get().removeItem(number, brand);
        } else {
          const newCount = existing.count - 1;
          set({
            items: get().items.map(i =>
              i.number === number && i.brand === brand
                ? {
                    ...i,
                    count: newCount,
                    totalPrice: newCount * i.price
                  }
                : i
            )
          });
        }
      }
    }),

    {
      name: "basket-storage",
      version: 1,
      onRehydrateStorage: () => state => {
        console.log("[basket:persist] hydration complete");
        state?.setHasHydrated(true);
      }
    }
  )
);
