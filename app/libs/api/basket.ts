import axios from "axios";

export type BasketItem = {
  skuId: number;
  supplierId: number;
  brand: string;
  article: string;
  description: string;
  price: number;
  qty: number;
  selected: boolean;
};

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
    brand: item.brand,
    article: item.article,
    description: item.description,
    price: item.price,
    qty: item.qty,
    selected: item.selected ?? false
  }));
};

export const addToBasket = async (item: BasketItem) => {
  await axios.post(`${API_URL}/basket/add`, item, withCredentials);
  notifyBasketUpdate();
};

export const removeFromBasket = async (skuId: number, supplierId: number) => {
  await axios.post(
    `${API_URL}/basket/remove`,
    { skuId, supplierId },
    withCredentials
  );
  notifyBasketUpdate(); // 🔔 уведомляем
};

export const deleteFromBasket = async (skuId: number, supplierId: number) => {
  await fetch(`${API_URL}/basket`, {
    method: "DELETE",
    credentials: "include", // 🔹 передаём cookie (JWT)
    body: JSON.stringify({ skuId, supplierId }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  notifyBasketUpdate(); // 🔔 уведомляем
};

export const clearBasket = async () => {
  await axios.delete(`${API_URL}/basket/clear`, withCredentials);
  notifyBasketUpdate(); // 🔔 уведомляем
};
