"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getProposalWord } from "@/features/search/common/getProposalWord";
import TemplateWrapper from "@/features/search/components/TemplateWrapper";
import { CrossesTable } from "@/features/search/components/tables/crosses/CrossesTable";
import { fetchCrossesData } from "@/features/search/server/fetchCrosses";
import { CrossData } from "@/features/search/types";

import { useBasketSync } from "@/hooks/useBasketSync";

import styles from "@/styles/pages/search/Search.module.css";

/**
 * Компонент отображает результаты второго этапа поиска запчастей.
 * Использует параметры маршрута (`/search/[brand]/[number]`) для загрузки
 * подробной информации о товаре и его аналогах.
 */
export const CrossesTemplate = () => {
  useBasketSync();
  // Извлекаем параметры из маршрута: бренд и номер детали
  const params = useParams();
  const number = params.number as string;
  const brand = params.brand as string;

  // Состояние: данные по кроссам и возможная ошибка
  const [data, setData] = useState<CrossData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Флаг готовности данных (по сути: загрузка завершена успешно)
  const isReady = data !== null;

  /**
   * Эффект загрузки данных с API по номеру и бренду.
   * Используется флаг `isActive`, чтобы избежать установки состояния,
   * если компонент размонтирован до завершения запроса.
   */
  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      try {
        const response = await fetchCrossesData(number, brand);

        if (!response) throw new Error("Ничего не найдено");

        if (isActive) setData(response);
      } catch (err: unknown) {
        if (isActive) {
          setError(
            err instanceof Error ? err.message : "Непредвиденная ошибка"
          );
        }
      }
    };

    fetchData();
    return () => {
      isActive = false;
    };
  }, [number, brand]);

  /**
   * Рендер контента в зависимости от состояния:
   * - ошибка
   * - загрузка
   * - пустой результат
   * - успешная загрузка
   */
  const renderContent = (() => {
    if (error) {
      return <h2 className={styles.titleError}>Ошибка: {error}</h2>;
    }

    if (!isReady) {
      return <h2 className={styles.title}>Загрузка предложений...</h2>;
    }

    const proposalsCount = data.crosses.length;
    const proposalWord = getProposalWord(proposalsCount);

    if (proposalsCount === 0) {
      return <h2 className={styles.title}>Ничего не найдено</h2>;
    }

    return (
      <>
        <h2 className={styles.title}>
          Найдено {proposalsCount} {proposalWord} по артикулу{" "}
          <span>
            {number} ({brand})
          </span>
        </h2>
        <CrossesTable
          brand={brand}
          descr={data.descr || "Описание отсутствует"}
          number={number}
          outerNumber={data.outerNumber || number}
          crosses={data.crosses}
          properties={data.properties}
          images={data.images}
        />
      </>
    );
  })();

  return <TemplateWrapper>{renderContent}</TemplateWrapper>;
};
