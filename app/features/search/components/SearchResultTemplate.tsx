"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SearchResultTable } from "@/features/search/components/tables/SearchResultTable";
import { fetchBrands } from "@/features/search/server/fetchBrands";
import { SearchBrand } from "@/features/search/types";

import { BackLink } from "@/components/ui/back-link/BackLink";
import { SearchForm } from "@/components/ui/forms/inputs/search/SearchForm";

export const SearchResultTemplate = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [number, setNumber] = useState<string | null>(null);
  const [brands, setBrands] = useState<SearchBrand[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const routeNumber = params?.number as string | undefined;
    const queryNumber = searchParams.get("number");

    if (routeNumber) {
      setNumber(routeNumber);
    } else if (queryNumber) {
      setNumber(queryNumber);
    }
  }, [params, searchParams]);

  useEffect(() => {
    const load = async () => {
      if (!number) return;

      try {
        const data = await fetchBrands(number);
        setBrands(data);
        setError(null);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Ошибка при выполнении запроса к ABCP API"
        );
      } finally {
        setIsLoaded(true); // 🔥 Важно!
      }
    };

    load();
  }, [number]);

  const renderContent = (() => {
    if (!isLoaded) return null;

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (brands.length === 0) {
      return <p className="text-lg">Запрошенный артикул детали не найден</p>;
    }

    return (
      <SearchResultTable
        brands={brands}
        fallbackNumber={number || "Неизвестный артикул"}
      />
    );
  })();

  return (
    <section className="section">
      <div className="container !mt-[32px]">
        <div className="flex flex-col gap-y-8">
          <div className="mx-auto flex w-full max-w-[768px] items-center">
            <SearchForm />
          </div>
          <BackLink />
          <h1>
            Результаты поиска для артикула{" "}
            <span className="text-peach">{number}</span>
          </h1>
          {renderContent}
        </div>
      </div>
    </section>
  );
};
