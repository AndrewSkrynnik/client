// orders.data.ts
import { OrderTableItem } from "@/features/office/orders/types";

export const mockOrders: OrderTableItem[] = [
  {
    id: "1",
    article: "A001",
    source: "Москва",
    date: "2025-05-01",
    price: "1000",
    quantity: 2,
    total: "2000",
    status: "В работе"
  },
  {
    id: "2",
    article: "B123",
    source: "Питер",
    date: "2025-05-05",
    price: "800",
    quantity: 1,
    total: "800",
    status: "Новый заказ"
  },
  {
    id: "3",
    article: "C321",
    source: "Казань",
    date: "2025-05-10",
    price: "500",
    quantity: 4,
    total: "2000",
    status: "Готов к выдаче"
  },
  {
    id: "4",
    article: "A001",
    source: "Москва",
    date: "2025-05-15",
    price: "1000",
    quantity: 3,
    total: "3000",
    status: "Отгружено"
  },
  {
    id: "5",
    article: "Z999",
    source: "Омск",
    date: "2025-05-20",
    price: "2000",
    quantity: 1,
    total: "2000",
    status: "В работе"
  },
  {
    id: "6",
    article: "M777",
    source: "Тула",
    date: "2025-05-21",
    price: "1500",
    quantity: 2,
    total: "3000",
    status: "Поступил на склад"
  },
  {
    id: "7",
    article: "X001",
    source: "Калуга",
    date: "2025-05-22",
    price: "700",
    quantity: 3,
    total: "2100",
    status: "Отказ клиента"
  },
  {
    id: "8",
    article: "D456",
    source: "Самара",
    date: "2025-05-23",
    price: "600",
    quantity: 5,
    total: "3000",
    status: "Задержка"
  },
  {
    id: "9",
    article: "E111",
    source: "Уфа",
    date: "2025-05-24",
    price: "900",
    quantity: 2,
    total: "1800",
    status: "Отправлен поставщику"
  },
  {
    id: "10",
    article: "F202",
    source: "Пенза",
    date: "2025-05-25",
    price: "1200",
    quantity: 1,
    total: "1200",
    status: "Возвращено клиентом"
  },
  {
    id: "11",
    article: "G333",
    source: "Томск",
    date: "2025-05-26",
    price: "750",
    quantity: 3,
    total: "2250",
    status: "Готов к выдаче"
  },
  {
    id: "12",
    article: "H444",
    source: "Новосибирск",
    date: "2025-05-27",
    price: "1800",
    quantity: 2,
    total: "3600",
    status: "Отгружено"
  },
  {
    id: "13",
    article: "I555",
    source: "Воронеж",
    date: "2025-05-28",
    price: "1300",
    quantity: 2,
    total: "2600",
    status: "Заказ невозможен"
  },
  {
    id: "14",
    article: "J666",
    source: "Ижевск",
    date: "2025-05-29",
    price: "1100",
    quantity: 4,
    total: "4400",
    status: "В работе"
  },
  {
    id: "15",
    article: "K777",
    source: "Сочи",
    date: "2025-05-30",
    price: "990",
    quantity: 3,
    total: "2970",
    status: "Новый заказ"
  },
  {
    id: "16",
    article: "L888",
    source: "Краснодар",
    date: "2025-06-01",
    price: "1450",
    quantity: 1,
    total: "1450",
    status: "Готов к выдаче"
  },
  {
    id: "17",
    article: "M999",
    source: "Тверь",
    date: "2025-06-02",
    price: "1020",
    quantity: 2,
    total: "2040",
    status: "Отказ клиента"
  },
  {
    id: "18",
    article: "N000",
    source: "Сургут",
    date: "2025-06-03",
    price: "800",
    quantity: 4,
    total: "3200",
    status: "Отправлен поставщику"
  },
  {
    id: "19",
    article: "P111",
    source: "Барнаул",
    date: "2025-06-04",
    price: "620",
    quantity: 2,
    total: "1240",
    status: "Задержка"
  },
  {
    id: "20",
    article: "Q222",
    source: "Хабаровск",
    date: "2025-06-05",
    price: "1600",
    quantity: 1,
    total: "1600",
    status: "Поступил на склад"
  }
];
