import { useEffect, useState } from "react";

import axios from "@/libs/axios";

export type Rates = {
  USD: number;
  EUR: number;
  CNY: number;
};

export const useCurrencyRates = () => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const { data } = await axios.get("/rates");

        setRates(data.rates);
        setDate(data.date);
      } catch (err) {
        console.error("Ошибка получения курсов валют:", err);
        setError(err as Error);
      }
    };

    fetchRates();
  }, []);

  return { rates, date, error };
};
