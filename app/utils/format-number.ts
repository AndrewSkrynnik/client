/* Форматирование для чисел (сумма, стоимость и т.д.) */
export const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
