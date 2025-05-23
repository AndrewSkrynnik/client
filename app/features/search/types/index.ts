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
  crosses: CrossReplacement[];
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
}

// Тип объекта "изображения"
export interface CrossImage {
  name: string;
  order: number;
  url: string;
}

// Тип основного объекта "Cross"
export interface Cross {
  brand: string; // Бренд оригинальной детали
  number: string; // Оригинальный номер детали
  outerNumber: string; // Альтернативный номер детали
  properties: Record<string, string>; // Свойства детали (например, вес, описание)
  crosses: CrossReplacement[]; // Массив кроссов
  images: CrossImage[]; // Массив изображений
  imagesCount: number; // Количество изображений
  descr: string; // Описание детали
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
  crosses: CrossReplacement[];
  properties: Record<string, string>;
  images: CrossImage[];
}

/* Counter */
export interface SearchCounterProps {
  count: number;
  stock: number;
  price: string;
  onChange: (value: number) => void;
}

/* BasketTotal */
export interface BasketTotalProps {
  count: number;
  onAddToBasket: () => void;
}
