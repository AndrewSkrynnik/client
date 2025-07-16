/* import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BasketItem = {
  id: string; // Уникальный ключ строки
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

  addItem: (item: Omit<BasketItem, "totalPrice">) => void;
  removeItem: (id: string) => void;
  updateCount: (id: string, count: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getTotalPrice: () => number;
  selectItem: (id: string, selected: boolean) => void;
  selectAll: (selected: boolean) => void;
  removeSelectedItems: () => void;
  incrementItemCount: (item: Omit<BasketItem, "totalPrice">) => void;
  decrementItemCount: (id: string) => void;
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      setHasHydrated: value => set({ hasHydrated: value }),

      addItem: item => {
        const existing = get().items.find(i => i.id === item.id);

        if (existing) {
          const newCount = Math.min(
            existing.count + item.count,
            existing.stock
          );
          set({
            items: get().items.map(i =>
              i.id === item.id
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

      removeItem: id => {
        set({
          items: get().items.filter(i => i.id !== id)
        });
      },

      updateCount: (id, count) => {
        set({
          items: get().items.map(i =>
            i.id === id
              ? {
                  ...i,
                  count: Math.min(count, i.stock),
                  totalPrice: Math.min(count, i.stock) * i.price
                }
              : i
          )
        });
      },

      incrementItemCount: item => {
        const existing = get().items.find(i => i.id === item.id);

        if (existing) {
          const newCount = Math.min(existing.count + 1, existing.stock);
          set({
            items: get().items.map(i =>
              i.id === item.id
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

      decrementItemCount: id => {
        const existing = get().items.find(i => i.id === id);
        if (!existing) return;

        if (existing.count <= 1) {
          get().removeItem(id);
        } else {
          const newCount = existing.count - 1;
          set({
            items: get().items.map(i =>
              i.id === id
                ? {
                    ...i,
                    count: newCount,
                    totalPrice: newCount * i.price
                  }
                : i
            )
          });
        }
      },

      selectItem: (id, selected) =>
        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, selected } : item
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

      removeSelectedItems: () => {
        set(state => ({
          items: state.items.filter(item => !item.selected)
        }));
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
 */
