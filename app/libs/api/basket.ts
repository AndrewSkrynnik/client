import { BasketDiffItem } from "@/features/office/basket/types/basket-diff.type";

import axios from "axios";

export interface BasketItem {
  selected: boolean;
  skuId: number;
  supplierId: number;
  hash: string;
  brand: string;
  article: string;
  descr: string;
  price: number;
  qty: number;
  availableQty: number; // 👈 обязательно
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const withCredentials = { withCredentials: true };

// 🔔 Триггер обновления во всех вкладках
const notifyBasketUpdate = () => {
  const channel = new BroadcastChannel("basket-sync");
  channel.postMessage("update");
  channel.close();
};

export const fetchBasket = async (): Promise<BasketItem[]> => {
  const res = await axios.get(`${API_URL}/basket`, withCredentials);

  return res.data.map((item: any) => ({
    skuId: item.skuId,
    supplierId: item.supplierId,
    hash: item.hash,
    brand: item.brand,
    article: item.article,
    descr: item.descr,
    price: item.price,
    qty: item.qty,
    availableQty: item.availableQty ?? 0, // 👈 безопасное добавление
    selected: item.selected ?? false
  }));
};

export const addToBasket = async (item: BasketItem) => {
  await axios.post(`${API_URL}/basket/add`, item, withCredentials);
  notifyBasketUpdate();
};

export const removeFromBasket = async (
  skuId: number,
  supplierId: number,
  hash: string
) => {
  await axios.post(
    `${API_URL}/basket/remove`,
    { skuId, supplierId, hash },
    withCredentials
  );
  notifyBasketUpdate();
};

export const deleteFromBasket = async (
  skuId: number,
  supplierId: number,
  hash: string
) => {
  await axios.delete(`${API_URL}/basket/delete`, {
    data: { skuId, supplierId, hash },
    ...withCredentials
  });
  notifyBasketUpdate();
};

export const clearBasket = async () => {
  await axios.delete(`${API_URL}/basket/clear`, withCredentials);
  notifyBasketUpdate();
};

export const updateBasketQty = async (
  skuId: number,
  supplierId: number,
  hash: string,
  qty: number,
  price?: number
) => {
  await axios.patch(
    `${API_URL}/basket/update`,
    { skuId, supplierId, hash, qty, price },
    withCredentials
  );
  notifyBasketUpdate();
};

export const validateBasket = async (
  items: BasketItem[]
): Promise<BasketDiffItem[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/basket/compare`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(
        items.map(item => ({
          skuId: item.skuId,
          supplierId: item.supplierId,
          qty: item.qty,
          basePrice: item.price,
          article: item.article,
          brand: item.brand,
          descr: item.descr
        }))
      )
    }
  );

  if (!res.ok) {
    throw new Error("Ошибка сравнения корзины");
  }

  return await res.json();
};
