import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { OrderTableItem } from "@/features/office/orders/types";

import { OrderItem, createOrder, getOrders } from "@/libs/api/orders";

export const useOrders = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (items: OrderItem[]) => createOrder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });

  const query = useQuery<OrderTableItem[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const rawOrders: any[] = await getOrders();

      return rawOrders.map(
        (order): OrderTableItem => ({
          id: String(order.id),
          orderDate: new Date(order.createdAt),
          details: order.items.map((item: any) => ({
            skuId: item.skuId,
            supplierId: item.supplierId,
            qty: item.qty,
            article: item.article,
            brand: item.brand,
            description: item.description,
            clientPrice: item.clientPrice,
            totalPrice: item.clientPrice * item.qty,
            statuses: item.statuses
          })),
          status: order.items?.[0]?.statuses?.[0]?.status ?? "-",
          fullName: order.fullName ?? "-",
          address: order.address ?? "-"
        })
      );
    }
  });

  return {
    ...query,
    createOrder: create.mutate,
    createOrderAsync: create.mutateAsync
  };
};
