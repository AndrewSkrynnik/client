"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import TemplateWrapper from "@/features/search/components/TemplateWrapper";
import { SearchResultTable } from "@/features/search/components/tables/SearchResultTable";
import { fetchBrands } from "@/features/search/server/fetchBrands";
import { SearchBrand } from "@/features/search/types";

import styles from "@/styles/pages/search/Search.module.css";

/**
 * Компонент для отображения результатов первого этапа поиска запчастей.
 * Выполняет загрузку списка брендов по введённому номеру детали и отображает
 * возможные совпадения из базы ABCP.
 */
export const SearchTemplate = () => {
  // Получение параметров маршрута (/search/[number]) и строки запроса (?number=...)
  const params = useParams();
  const searchParams = useSearchParams();

  // Состояние для списка брендов, ошибки и индикатора загрузки
  const [brands, setBrands] = useState<SearchBrand[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Определение номера детали из параметров URL или query-параметра (?number=...)
   * Используется useMemo для предотвращения лишних вычислений при ререндере
   */
  const number = useMemo(
    () => (params?.number as string) || searchParams.get("number") || null,
    [params, searchParams]
  );

  /**
   * Эффект выполняет загрузку брендов по номеру детали, как только номер становится доступен
   */
  useEffect(() => {
    if (!number) return;

    const load = async () => {
      try {
        const data = await fetchBrands(number); // загрузка данных из API ABCP
        setBrands(data); // обновление состояния брендов
        setError(null); // сброс ошибки
      } catch (err: any) {
        // Обработка ошибок от API или сети
        setError(
          err.response?.data?.message ||
            err.message ||
            "Ошибка при выполнении запроса к ABCP API"
        );
      } finally {
        setLoading(false); // завершение загрузки
      }
    };

    load();
  }, [number]);

  /**
   * Рендер содержимого страницы в зависимости от текущего состояния:
   * - загрузка
   * - ошибка
   * - отсутствие данных
   * - успешный результат
   */
  const renderContent = (() => {
    if (!number || loading) {
      return <h2 className={styles.title}>Загрузка...</h2>;
    }

    if (error) {
      return <h2 className={styles.titleError}>{error}</h2>;
    }

    if (brands.length === 0) {
      return (
        <h2 className={styles.title}>Запрошенный артикул детали не найден</h2>
      );
    }

    return (
      <>
        <h2 className={styles.title}>
          Результаты поиска для артикула <span>{number}</span>
        </h2>
        <SearchResultTable
          brands={brands}
          fallbackNumber={number || "Неизвестный артикул"}
        />
      </>
    );
  })();

  /**
   * Обёртка TemplateWrapper отвечает за layout (search form, back link, стили), сюда вставляется результат рендера контента
   */
  return <TemplateWrapper>{renderContent}</TemplateWrapper>;
};
