"use client";

import { useEffect, useState } from "react";

import { AttachMoneyIcon, CurrencyYenIcon, EuroIcon } from "@/components/icons";

import styles from "@/styles/components/ui/currency-rates/CurrencyRates.module.css";

import axios from "axios";

type Rates = {
  USD: number;
  EUR: number;
  CNY: number;
};

export const CurrencyRates = () => {
  const [rates, setRates] = useState<Rates | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const { data } = await axios.get("/api/rates");
        setRates(data.rates);
        setDate(data.date);
      } catch (error) {
        console.error("Ошибка получения курсов валют:", error);
      }
    };

    fetchRates();
  }, []);

  if (!rates) return <p>Загрузка курса валют...</p>;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("ru-RU")
    : null;

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Курс валюты ЦБ РФ<span>{formattedDate && `: ${formattedDate}`}</span>
      </p>
      <ul className={styles.listItems}>
        <li className={styles.item}>
          <AttachMoneyIcon
            sx={{ fontSize: "18px", color: "green" }}
            className={styles.icon}
          />
          <span>{rates.USD.toFixed(2)} ₽</span>
        </li>
        <li className={styles.item}>
          <EuroIcon
            sx={{ fontSize: "18px", color: "blue" }}
            className={styles.icon}
          />
          <span>{rates.EUR.toFixed(2)} ₽</span>
        </li>
        <li className={styles.item}>
          <CurrencyYenIcon
            sx={{ fontSize: "18px", color: "red" }}
            className={styles.icon}
          />
          <span>{rates.CNY.toFixed(2)} ₽</span>
        </li>
      </ul>
    </div>
  );
};
