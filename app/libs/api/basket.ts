import axios from "axios";

export interface BasketItem {
  selected: boolean;
  skuId: number;
  supplierId: number;
  hash: string;
  brand: string;
  article: string;
  description: string;
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
    description: item.description,
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
