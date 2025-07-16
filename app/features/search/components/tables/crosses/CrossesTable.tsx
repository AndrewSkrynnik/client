"use client";

import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

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

  const [modalState, setModalState] = useState<{
    image?: string;
    info?: Record<string, string>;
  }>({
    image: searchParams.get("image") || undefined,
    info: undefined
  });

  const [crossesWithData, setCrossesWithData] = useState<
    {
      skuId: number;
      supplierId: number;
      brand: string;
      numberFix: string;
      price: number;
      stock: number;
      count: number;
    }[]
  >([]);

  useEffect(() => {
    setCrossesWithData(
      crosses.flatMap(offerGroup =>
        offerGroup.offers.map(offer => ({
          skuId: offer.skuId,
          supplierId: offer.supplierId,
          brand: offerGroup.brand,
          numberFix: offerGroup.number,
          price: offer.price,
          stock: offer.qty,
          count: 0
        }))
      )
    );
  }, [crosses]);

  const updateCrossCount = (index: number, value: number) => {
    setCrossesWithData(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, count: Math.max(0, Math.min(item.stock, value)) }
          : item
      )
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const paginatedCrosses = useMemo(
    () => paginate(crossesWithData, currentPage, SEARCH_PAGINATION),
    [crossesWithData, currentPage]
  );

  const closeModal = useCallback(() => {
    setModalState({ image: undefined, info: undefined });
    router.replace("?", { scroll: false });
  }, [router]);

  const openImageModal = (type: "image", value: string) => {
    setModalState(prev => ({ ...prev, [type]: value }));
  };

  const openInfoModal = (value: Record<string, string>) => {
    setModalState(prev => ({ ...prev, info: value }));
  };

  const { addItem } = useBasket();

  const addToCart = (cross: (typeof crossesWithData)[number]) => {
    if (cross.count === 0) return;

    for (let i = 0; i < cross.count; i++) {
      addItem({ skuId: cross.skuId, supplierId: cross.supplierId });
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <CrossesTableHead />
          <CrossesTableBody
            crosses={paginatedCrosses}
            descr={descr}
            properties={properties}
            images={images}
            onUpdateCount={updateCrossCount}
            onOpenImageModal={url => openImageModal("image", url)}
            onOpenInfoModal={openInfoModal}
            onAddToCart={index => addToCart(paginatedCrosses[index])}
          />
        </Table>
      </TableContainer>
      <PaginationComponent
        totalItems={crossesWithData.length}
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
