"use client";

import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/buttons/Button";
import { FilterInput } from "@/components/ui/forms/inputs/filter/FilterInput";
import { FilterSelect } from "@/components/ui/forms/inputs/filter/FilterSelect";

import styles from "@/styles/pages/search/SearchFilterPanel.module.css";

export interface Item {
  brand: string;
  article: string;
  price: number;
}

export interface Filters {
  brand: string;
  article: string;
  minPrice: number;
  maxPrice: number;
}

const extractUniqueValues = (items: Item[]) => {
  const brands = [...new Set(items.map(i => i.brand))];
  const articles = [...new Set(items.map(i => i.article))];
  const prices = items.map(i => i.price).filter(p => !isNaN(p));

  const min = prices.length > 0 ? Math.min(...prices) : 0;
  const max = prices.length > 0 ? Math.max(...prices) : 0;

  return { brands, articles, minPrice: min, maxPrice: max };
};

export const SearchFilterPanel = ({
  items,
  onFilter
}: {
  items: Item[];
  onFilter: (filters: Filters) => void;
}) => {
  const { brands, articles, minPrice, maxPrice } = useMemo(
    () => extractUniqueValues(items),
    [items]
  );

  const { control, setValue, reset } = useForm<Filters>({
    defaultValues: {
      brand: "",
      article: "",
      minPrice,
      maxPrice
    }
  });

  // при изменении фильтров из формы → обновляем onFilter
  const values = useWatch({ control });

  useEffect(() => {
    onFilter({
      brand: values.brand || "",
      article: values.article || "",
      minPrice: values.minPrice || 0,
      maxPrice: values.maxPrice || 0
    });
  }, [values, onFilter]);

  useEffect(() => {
    setValue("minPrice", minPrice);
    setValue("maxPrice", maxPrice);
  }, [minPrice, maxPrice, setValue]);

  useEffect(() => {
    const newMin = Math.max(minPrice, values.minPrice || 0);
    const newMax = Math.min(maxPrice, values.maxPrice || maxPrice);

    if (values.minPrice !== newMin) {
      setValue("minPrice", newMin);
    }

    if (values.maxPrice !== newMax) {
      setValue("maxPrice", newMax);
    }
  }, [values.minPrice, values.maxPrice, minPrice, maxPrice, setValue]);

  const handleReset = () => {
    reset({
      brand: "",
      article: "",
      minPrice,
      maxPrice
    });
  };

  return (
    <div className={styles.panel}>
      <FilterSelect
        control={control}
        name="article"
        options={articles}
        placeholder="Все артикулы"
      />
      <FilterSelect
        control={control}
        name="brand"
        options={brands}
        placeholder="Все бренды"
      />
      <FilterInput
        control={control}
        name="minPrice"
        label="Цена от"
        type="number"
        placeholder={String(minPrice)}
        min={minPrice}
        max={maxPrice}
        step={1}
        inputMode="decimal"
      />

      <FilterInput
        control={control}
        name="maxPrice"
        label="Цена до"
        type="number"
        placeholder={String(maxPrice)}
        min={minPrice}
        max={maxPrice}
        step={1}
        inputMode="decimal"
      />

      <Button size="Small" variant="SecondaryOutline" onClick={handleReset}>
        Сброс
      </Button>
    </div>
  );
};
