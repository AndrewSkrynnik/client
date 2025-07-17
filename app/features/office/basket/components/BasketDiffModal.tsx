"use client";

import { Button } from "@/components/ui/buttons/Button";
import { ModalComponent } from "@/components/ui/modal/ModalComponent";

import { formatNumber } from "@/utils/format-number";

export type BasketDiffItem = {
  skuId: number;
  supplierId: number;
  article: string;
  brand: string;
  description: string;
  oldPrice?: number;
  newPrice?: number;
  oldQty?: number;
  newQty?: number;
};

interface BasketDiffModalProps {
  open: boolean;
  changes: BasketDiffItem[];
  onApply: () => void;
  onClose: () => void;
}

export const BasketDiffModal = ({
  open,
  changes,
  onApply,
  onClose
}: BasketDiffModalProps) => (
  <ModalComponent open={open} onClose={onClose}>
    <div className="flex w-[640px] flex-col gap-6 p-4">
      <h2 className="text-lg font-semibold text-red-600">
        Изменения в корзине
      </h2>

      <div className="text-muted-foreground text-sm">
        Некоторые товары были изменены. Пожалуйста, проверьте и подтвердите
        обновления, чтобы продолжить оформление заказа.
      </div>

      <div>
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th>Артикул</th>
              <th>Бренд</th>
              <th>Описание</th>
              <th>Старая цена</th>
              <th>Новая цена</th>
              <th>Старый остаток</th>
              <th>Новый остаток</th>
            </tr>
          </thead>
          <tbody>
            {changes.map(item => (
              <tr key={item.skuId}>
                <td>{item.article}</td>
                <td>{item.brand}</td>
                <td>{item.description}</td>
                <td className="text-center">
                  {item.oldPrice !== undefined
                    ? formatNumber(item.oldPrice) + " ₽"
                    : "—"}
                </td>
                <td className="text-center">
                  {item.newPrice !== undefined
                    ? formatNumber(item.newPrice) + " ₽"
                    : "—"}
                </td>
                <td className="text-center">
                  {item.oldQty !== undefined ? `${item.oldQty} шт.` : "—"}
                </td>
                <td className="text-center">
                  {item.newQty !== undefined ? `${item.newQty} шт.` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <Button onClick={onClose}>Закрыть</Button>
        <Button onClick={onApply}>Пересчитать корзину</Button>
      </div>
    </div>
  </ModalComponent>
);
