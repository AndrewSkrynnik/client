"use client";

import { useRouter } from "next/navigation";

import { SearchResultTableProps } from "@/features/search/types";

import styles from "../SearchResult.module.css";

export const SearchResultTable = ({
  brands,
  fallbackNumber
}: SearchResultTableProps) => {
  const router = useRouter();

  console.log("Rendering SearchResultTable with brands:", brands);

  if (brands.length === 0) {
    console.warn("Brands array is empty or undefined.");
    return (
      <p className="text-center text-gray-500">Нет данных для отображения.</p>
    );
  }

  const number = brands[0]?.number || fallbackNumber;

  const handleRowClick = (brand: string) => {
    if (!number) {
      console.error("Ошибка: номер артикула отсутствует!");
      return;
    }
    router.push(
      `/search-results/${number}/crosses/${encodeURIComponent(brand)}`
    );
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.th}>
          <th className={styles.th}>Производитель</th>
          <th className={styles.th}>Артикул (Номер)</th>
          <th className={styles.th}>Описание</th>
          <th className={styles.th} />
        </tr>
      </thead>
      <tbody>
        {brands.map(brand => (
          <tr
            key={brand.id}
            className={styles.tr}
            onClick={() => handleRowClick(brand.brand)}
          >
            <td className={styles.td}>{brand.brand}</td>
            <td className={styles.td}>{brand.number}</td>
            <td className={styles.td}>{brand.description}</td>
            <td className={`${styles.td} ${styles.findButton}`}>Найти</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
