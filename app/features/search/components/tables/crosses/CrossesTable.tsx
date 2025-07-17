"use client";

import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { ModalImage } from "@/features/search/components/modals/ModalImage";
import { ModalInfo } from "@/features/search/components/modals/ModalInfo";
import { CrossesTableBody } from "@/features/search/components/tables/crosses/CrossesTableBody";
import { CrossesTableHead } from "@/features/search/components/tables/crosses/CrossesTableHead";
import { CrossesTableProps } from "@/features/search/types";

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

  const crossesWithData = useMemo(
    () =>
      crosses.flatMap(group =>
        group.offers.map(offer => ({
          skuId: offer.skuId,
          supplierId: offer.supplierId,
          brand: group.brand,
          numberFix: group.number,
          price: offer.price,
          stock: offer.qty,
          count: 0,
          hash: `${offer.price}-${offer.qty}`
        }))
      ),
    [crosses]
  );

  const [rows, setRows] = useState(crossesWithData);

  const paginatedRows = useMemo(
    () => paginate(rows, currentPage, SEARCH_PAGINATION),
    [rows, currentPage]
  );

  const updateCrossCount = useCallback((index: number, value: number) => {
    setRows(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, count: Math.max(0, Math.min(item.stock, value)) }
          : item
      )
    );
  }, []);

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
    (cross: (typeof crossesWithData)[number]) => {
      if (!cross.count) return;
      for (let i = 0; i < cross.count; i++) {
        addItem({
          skuId: cross.skuId,
          supplierId: cross.supplierId,
          hash: cross.hash,
          brand: cross.brand,
          article: cross.numberFix,
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
        totalItems={rows.length}
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
