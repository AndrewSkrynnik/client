"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SearchForm } from "@/features/search/SearchForm";
import { SearchResultTable } from "@/features/search/components/tables/SearchResultTable";
import { SearchBrand } from "@/features/search/types";

import { Button } from "@/components/ui/buttons/Button";

import axiosInstance from "@/libs/axios";

export const SearchResultTemplate = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [number, setNumber] = useState<string | null>(null);
  const [brands, setBrands] = useState<SearchBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    const fetchBrands = async () => {
      if (!number) return;

      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/abcp/search-brands`,
          {
            params: { number }
          }
        );

        const responseData = response.data;

        if (responseData && typeof responseData === "object") {
          const transformedBrands = Object.keys(responseData).map(key => ({
            id: key,
            brand: responseData[key].brand,
            number: responseData[key].number,
            numberFix: responseData[key].numberFix,
            description:
              responseData[key].description || "Описание отсутствует",
            availability: responseData[key].availability || 0
          }));
          setBrands(transformedBrands);
        } else {
          console.error("Unexpected API response format:", response.data);
          setError("Некорректный формат ответа от сервера");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [number]);

  if (loading) return <div>Загрузка...</div>;
  if (brands.length === 0) {
    return (
      <div className="flex flex-col gap-y-8">
        <h2 className="text-2xl">Результаты поиска</h2>
        <p className="text-lg">
          Запрошенный артикул детали{" "}
          <span className="text-secondary font-bold">{number}</span> не найден
        </p>
        <Link className="max-w-[120px]" href="/">
          <Button variant="PrimaryOutline" size="Medium">
            Назад
          </Button>
        </Link>
      </div>
    );
  }
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="flex flex-col gap-y-8">
      <div className="mx-auto mt-[20px] mb-[-20px] flex w-full max-w-[768px] items-center">
        <SearchForm />
      </div>
      <h1 className="text-2xl">
        Результаты поиска для артикула{" "}
        <span className="text-secondary">{number}</span>
      </h1>
      <SearchResultTable
        brands={brands}
        fallbackNumber={number || "Неизвестный артикул"}
      />
      <Link className="max-w-[120px]" href="/">
        <Button variant="PrimaryOutline" size="Medium">
          Назад
        </Button>
      </Link>
    </div>
  );
};
