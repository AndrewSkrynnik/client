"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SearchForm } from "@/features/search/SearchForm";
import { getProposalWord } from "@/features/search/common/getProposalWord";
import { SearchCrossesTable } from "@/features/search/components/tables/SearchCrossesTable";
import { fetchCrossesData } from "@/features/search/server/crossesService";
import { CrossData } from "@/features/search/types";

export const SearchCrossesTemplate = () => {
  const params = useParams();
  const number = params.number as string;
  const brand = params.brand as string;

  const [data, setData] = useState<CrossData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchCrossesData(number, brand);
        console.log("Данные в компоненте:", response);

        if (!response) {
          console.warn("API вернул пустые данные о кроссах.");
          setData(null);
        } else {
          setData(response);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Непредвиденная ошибка");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [number, brand]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500">Ошибка: {error}</div>;
  }

  const proposalsCount = data?.crosses.length || 0;
  const proposalWord = getProposalWord(proposalsCount);

  return (
    <div className="flex flex-col gap-y-8">
      <div className="mx-auto mt-[20px] mb-[-20px] flex w-full max-w-[768px] items-center">
        <SearchForm />
      </div>
      <h2 className="text-xl">
        Найдено{" "}
        <span className="text-secondary font-bold">
          {proposalsCount} {proposalWord}
        </span>{" "}
        из прайс-листа по артикулу{" "}
        <span className="text-secondary font-bold">{number} </span>{" "}
        <span className="text-secondary font-bold">({brand})</span>
      </h2>
      {proposalsCount === 0 ? (
        <p>Ничего не найдено.</p>
      ) : (
        <SearchCrossesTable
          brand={brand}
          descr={data?.descr || "Описание отсутствует"}
          number={number}
          outerNumber={data?.outerNumber || number}
          crosses={data?.crosses || []}
          properties={data?.properties || {}}
          images={data?.images || []}
        />
      )}
    </div>
  );
};
