"use client";

import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Filters,
  SearchFilterPanel
} from "@/features/search/components/SearchFilterPanel";
import { ModalImage } from "@/features/search/components/modals/ModalImage";
import { ModalInfo } from "@/features/search/components/modals/ModalInfo";
import { CrossesTableBody } from "@/features/search/components/tables/crosses/CrossesTableBody";
import { CrossesTableHead } from "@/features/search/components/tables/crosses/CrossesTableHead";
import { CrossesTableProps } from "@/features/search/types";
import { CrossItem } from "@/features/search/types/crosses.types";

import { PaginationComponent } from "@/components/ui/pagination/PaginationComponent";

import { useBasket } from "@/hooks/useBasket";

import { paginate } from "@/utils/paginate";

import { SEARCH_PAGINATION } from "@/common/constants";

export const CrossesTable = ({
  descr,
  properties,
  images,
  crosses
}: CrossesTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useBasket();

  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState<{
    image?: string;
    info?: Record<string, string>;
  }>({
    image: searchParams.get("image") || undefined
  });

  const items: CrossItem[] = useMemo(
    () =>
      crosses.flatMap(group =>
        group.offers.map(offer => ({
          skuId: offer.skuId,
          supplierId: offer.supplierId,
          brand: group.brand,
          article: group.number,
          numberFix: group.number,
          price: offer.price,
          basePrice: offer.basePrice,
          stock: offer.qty,
          count: 0,
          hash: `${offer.price}-${offer.qty}`
        }))
      ),
    [crosses]
  );

  console.log("items in search:", items);

  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const prices = items.map(i => i.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    setFilters({
      brand: "",
      article: "",
      minPrice: min,
      maxPrice: max
    });
  }, [items]);

  const [filters, setFilters] = useState<Filters>({
    brand: "",
    article: "",
    minPrice: 0,
    maxPrice: 0
  });

  const handleFilterChange = useCallback((updated: Filters) => {
    setFilters(updated);
    setCurrentPage(1);
  }, []);

  const filteredRows = useMemo(
    () =>
      items.filter(
        i =>
          (!filters.brand || i.brand === filters.brand) &&
          (!filters.article || i.article === filters.article) &&
          i.price >= filters.minPrice &&
          i.price <= filters.maxPrice
      ),
    [items, filters]
  );

  const paginatedRows = useMemo(
    () => paginate(filteredRows, currentPage, SEARCH_PAGINATION),
    [filteredRows, currentPage]
  );

  const updateCrossCount = useCallback(
    (index: number, value: number) => {
      const itemIndex =
        currentPage * SEARCH_PAGINATION - SEARCH_PAGINATION + index;
      const updated = [...filteredRows];
      updated[itemIndex] = {
        ...updated[itemIndex],
        count: Math.max(0, Math.min(updated[itemIndex].stock, value))
      };
      // можно сохранить count в отдельном состоянии, если нужно
    },
    [filteredRows, currentPage]
  );

  const openModal = useCallback(
    (type: "image" | "info", value: string | Record<string, string>) => {
      setModalState(prev => ({ ...prev, [type]: value }));
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalState({ image: undefined, info: undefined });
    router.replace("?", { scroll: false });
  }, [router]);

  const addToCart = useCallback(
    (cross: (typeof items)[number]) => {
      if (!cross.count) return;
      for (let i = 0; i < cross.count; i++) {
        addItem({
          skuId: cross.skuId,
          supplierId: cross.supplierId,
          hash: cross.hash,
          brand: cross.brand,
          article: cross.article,
          description: descr || "Описание отсутствует",
          price: cross.price,
          qty: 1,
          selected: true
        });
      }
    },
    [addItem, descr]
  );

  return (
    <>
      <SearchFilterPanel items={items} onFilter={handleFilterChange} />

      <TableContainer component={Paper}>
        <Table>
          <CrossesTableHead />
          <CrossesTableBody
            crosses={paginatedRows}
            descr={descr}
            properties={properties}
            images={images}
            onUpdateCount={updateCrossCount}
            onOpenImageModal={url => openModal("image", url)}
            onOpenInfoModal={props => openModal("info", props)}
            onAddToCart={index => addToCart(paginatedRows[index])}
          />
        </Table>
      </TableContainer>

      <PaginationComponent
        totalItems={filteredRows.length}
        rowsPerPage={SEARCH_PAGINATION}
        currentPage={currentPage}
        onChange={setCurrentPage}
      />

      <ModalImage
        open={Boolean(modalState.image)}
        imageUrl={modalState.image ?? ""}
        onClose={closeModal}
      />
      <ModalInfo
        open={Boolean(modalState.info)}
        properties={modalState.info ?? {}}
        onClose={closeModal}
      />
    </>
  );
};
