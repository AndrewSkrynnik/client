/* Представляет одну позицию (товар) из кросс-номеров */
export interface CrossItem {
  skuId: number;
  supplierId: number;
  brand: string;
  numberFix: string;
  price: number;
  stock: number;
  count: number;
}

/* Общие обработчики и дополнительные данные для таблицы и строки */
export interface CrossCommonHandlers {
  descr?: string;
  properties?: Record<string, string>;
  images?: { url: string }[];
  onUpdateCount: (index: number, value: number) => void;
  onOpenImageModal: (url: string) => void;
  onOpenInfoModal: (info: Record<string, string>) => void;
  onAddToCart: (index: number) => void;
}

/* Пропсы для тела таблицы кроссов (все строки) */
export interface CrossesTableBodyProps extends CrossCommonHandlers {
  crosses: CrossItem[];
}

/* Пропсы для одной строки таблицы */
export interface CrossesTableRowProps extends CrossCommonHandlers {
  index: number;
  cross: CrossItem;
}
