import { ChangeEvent, KeyboardEventHandler } from "react";

/* Search Input Props */
export interface SearchInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onClear?: () => void;
}

/* Search Result Props */
//  Тип для брендов, получаемых в результате поиска в компоненте SearchResultTemplate
export interface SearchBrand {
  id: string;
  brand: string;
  description: string;
  availability: boolean;
  number: string;
  numberFix: string;
}

// Тип пропсов для компонента ResultSearchTable
export interface SearchResultTableProps {
  brands: SearchBrand[];
  fallbackNumber: string;
}

// Тип пропсов для компонента ResultTableBodyRow
export interface ResultTableBodyRowProps {
  item: SearchBrand;
  onClick: () => void;
}

// Тип данных о кроссах в SearchCrossesTemplate
export interface CrossData {
  brand: string;
  number: string;
  outerNumber: string;
  descr: string;
  properties: Record<string, string>;
  localOffers: LocalOfferGroup[];
  images: CrossImage[];
  imagesCount: number;
}

// Тип объекта "кросс"
export interface CrossReplacement {
  crossType: number;
  brand: string;
  number: string;
  numberFix: string;
  reliable: boolean;
  images: { name: string }[];
  properties?: Record<string, string>;
  localOffers?: LocalOfferGroup[];
}

export interface LocalOfferGroup {
  brand: string;
  number: string;
  offers: {
    skuId: number;
    supplierId: number;
    price: number;
    basePrice: number;
    qty: number;
  }[];
}

// Тип объекта "изображения"
export interface CrossImage {
  name: string;
  order: number;
  url: string;
}

// Тип ответа API ABCP
export interface AbcpResponse {
  brand: string;
  number: string;
  outer_number: string;
  properties: Record<string, string>;
  crosses: CrossReplacement[];
  images: CrossImage[];
  images_count: number;
  descr: string;
}

export interface CrossesTableProps {
  brand: string;
  descr: string;
  number: string;
  outerNumber: string;
  crosses: LocalOfferGroup[];
  properties: Record<string, string>;
  images: CrossImage[];
}

/* Counter */
export interface SearchCounterProps {
  count: number;
  stock: number;
  price: number;
  onInputChange?: (value: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
}
