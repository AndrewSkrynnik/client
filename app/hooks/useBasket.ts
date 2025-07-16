import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import {
  BasketItem,
  addToBasket,
  clearBasket,
  deleteFromBasket,
  fetchBasket,
  removeFromBasket
} from "@/libs/api/basket";

type BasketActionInput = Pick<BasketItem, "skuId" | "supplierId" | "hash"> & {
  brand?: string;
  article?: string;
  description?: string;
  price?: number;
  qty?: number;
  selected?: boolean;
};

type UseBasketParams = {
  selectedSet?: Set<string>;
  setSelectedSet?: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export const useBasket = (params?: UseBasketParams) => {
  const selectedSet = params?.selectedSet;
  const setSelectedSet = params?.setSelectedSet;

  const queryClient = useQueryClient();

  const {
    data: items = [],
    isLoading,
    error
  } = useQuery<BasketItem[]>({
    queryKey: ["basket"],
    queryFn: fetchBasket
  });

  const getKey = (skuId: number, supplierId: number, hash: string) =>
    `${skuId}_${supplierId}_${hash}`;

  const extendedItems = useMemo(
    () =>
      items.map(item => ({
        ...item,
        selected:
          selectedSet?.has(getKey(item.skuId, item.supplierId, item.hash)) ??
          false
      })),
    [items, selectedSet]
  );

  const toggleItemSelection = (
    skuId: number,
    supplierId: number,
    hash: string
  ) => {
    if (!setSelectedSet || !selectedSet || !hash) return;

    const key = getKey(skuId, supplierId, hash);
    setSelectedSet(prev => {
      const newSet = new Set(prev);
      newSet.has(key) ? newSet.delete(key) : newSet.add(key);
      return newSet;
    });
  };

  const selectAllItems = (checked: boolean) => {
    if (!setSelectedSet) return;

    if (checked) {
      const all = items.map(i => getKey(i.skuId, i.supplierId, i.hash));
      setSelectedSet(new Set(all));
    } else {
      setSelectedSet(new Set());
    }
  };

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["basket"] });

  const addMutation = useMutation({
    mutationFn: (item: BasketItem) => addToBasket(item),
    onSuccess: invalidate
  });

  const removeMutation = useMutation({
    mutationFn: ({ skuId, supplierId, hash }: BasketActionInput) => {
      if (!hash) throw new Error("Missing hash for removeItem");
      return removeFromBasket(skuId, supplierId, hash);
    },
    onSuccess: invalidate
  });

  const deleteMutation = useMutation({
    mutationFn: ({ skuId, supplierId, hash }: BasketActionInput) => {
      if (!hash) throw new Error("Missing hash for deleteItem");
      return deleteFromBasket(skuId, supplierId, hash);
    },
    onSuccess: (_, { skuId, supplierId, hash }) => {
      invalidate();
      if (!setSelectedSet || !hash) return;
      const key = getKey(skuId, supplierId, hash);
      setSelectedSet(prev => {
        const copy = new Set(prev);
        copy.delete(key);
        return copy;
      });
    }
  });

  const clearMutation = useMutation({
    mutationFn: clearBasket,
    onSuccess: () => {
      invalidate();
      if (setSelectedSet) setSelectedSet(new Set());
    }
  });

  const deleteSelectedAsync = async () => {
    if (!selectedSet || selectedSet.size === 0) return;

    const selectedItems = items.filter(item =>
      selectedSet.has(getKey(item.skuId, item.supplierId, item.hash))
    );

    await Promise.all(
      selectedItems.map(item =>
        deleteMutation.mutateAsync({
          skuId: item.skuId,
          supplierId: item.supplierId,
          hash: item.hash
        })
      )
    );
  };

  return {
    items: extendedItems,
    isLoading,
    error,

    addItem: (input: BasketActionInput) => {
      if (!input.hash) throw new Error("Missing hash for addItem");

      const basketItem: BasketItem = {
        skuId: input.skuId,
        supplierId: input.supplierId,
        hash: input.hash,
        brand: input.brand ?? "",
        article: input.article ?? "",
        description: input.description ?? "",
        price: input.price ?? 0,
        qty: input.qty ?? 0,
        selected: input.selected ?? false
      };

      addMutation.mutate(basketItem);
    },

    removeItem: (input: BasketActionInput) => removeMutation.mutate(input),
    deleteItem: (input: BasketActionInput) => deleteMutation.mutate(input),
    clear: () => clearMutation.mutate(),

    addItemAsync: addMutation.mutateAsync,
    removeItemAsync: removeMutation.mutateAsync,
    deleteItemAsync: deleteMutation.mutateAsync,
    clearAsync: clearMutation.mutateAsync,
    deleteSelectedAsync, // ✅ доступен для вызова после оформления заказа

    toggleItemSelection,
    selectAllItems
  };
};
