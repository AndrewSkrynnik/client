export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB"
  }).format(value);
