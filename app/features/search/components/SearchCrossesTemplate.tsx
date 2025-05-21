"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getProposalWord } from "@/features/search/common/getProposalWord";
import { SearchCrossesTable } from "@/features/search/components/tables/SearchCrossesTable";
import { fetchCrossesData } from "@/features/search/server/fetchCrosses";
import { CrossData } from "@/features/search/types";

import { BackLink } from "@/components/ui/back-link/BackLink";
import { SearchForm } from "@/components/ui/forms/inputs/search/SearchForm";

export const SearchCrossesTemplate = () => {
  const params = useParams();
  const number = params.number as string;
  const brand = params.brand as string;

  const [data, setData] = useState<CrossData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMinDelayPassed, setIsMinDelayPassed] = useState(false);

  const isReady = data !== null;

  useEffect(() => {
    const delay = setTimeout(() => setIsMinDelayPassed(true), 300); // минимум 300мс
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      try {
        const response = await fetchCrossesData(number, brand);

        if (!response) {
          throw new Error("Ничего не найдено");
        }

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

  if (error) {
    return (
      <div className="container !mt-[32px]">
        <div className="flex flex-col gap-y-8">
          <div className="mx-auto flex w-full max-w-[768px] items-center">
            <SearchForm />
          </div>
          <BackLink />
          <p className="text-red-500">Ошибка: {error}</p>
        </div>
      </div>
    );
  }

  if (!isReady || !isMinDelayPassed) {
    return (
      <div className="container !mt-[32px]">
        <div className="flex flex-col gap-y-8">
          <div className="mx-auto flex w-full max-w-[768px] items-center">
            <SearchForm />
          </div>
          <BackLink />
          <p className="text-gray-500">Загрузка предложений...</p>
        </div>
      </div>
    );
  }

  const proposalsCount = data.crosses.length;
  const proposalWord = getProposalWord(proposalsCount);

  return (
    <section className="section">
      <div className="container !mt-[32px]">
        <div className="flex flex-col gap-y-8">
          <div className="mx-auto flex w-full max-w-[768px] items-center">
            <SearchForm />
          </div>
          <BackLink />
          <h2 className="text-xl">
            Найдено{" "}
            <span className="font-bold">
              {proposalsCount} {proposalWord}
            </span>{" "}
            из прайс-листа по артикулу{" "}
            <span className="text-peach font-bold">
              {number} ({brand})
            </span>
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
              isLoading={!isReady || !isMinDelayPassed}
              isError={!!error}
            />
          )}
        </div>
      </div>
    </section>
  );
};
