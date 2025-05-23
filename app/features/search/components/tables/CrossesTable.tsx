"use client";

import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { OrdersPagination } from "@/features/office/orders/components/OrdersPagination";
import { SEARCH_PAGINATION } from "@/features/search/common/constants";
import { ModalImage } from "@/features/search/components/modals/ModalImage";
import { ModalInfo } from "@/features/search/components/modals/ModalInfo";
import { CrossesTableBody } from "@/features/search/components/tables/CrossesTableBody";
import { CrossesTableHead } from "@/features/search/components/tables/CrossesTableHead";
import { CrossesTableProps } from "@/features/search/types";

import { useBasketStore } from "@/store/useBasketStore";

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
      brand: string;
      numberFix: string;
      price: string;
      stock: number;
      count: number;
    }[]
  >([]);

  useEffect(() => {
    const newData = crosses.map(cross => ({
      ...cross,
      price: (Math.random() * (10000 - 1000) + 1000).toFixed(2),
      stock: Math.floor(Math.random() * 51),
      count: 0
    }));

    setCrossesWithData(newData);
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
  const currentCrosses = crossesWithData.slice(
    (currentPage - 1) * SEARCH_PAGINATION,
    currentPage * SEARCH_PAGINATION
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

  const addToCart = (cross: {
    brand: string;
    number: string;
    description: string;
    price: string;
    count: number;
    stock: number;
  }) => {
    if (cross.count === 0) return;

    useBasketStore.getState().addItem({
      brand: cross.brand,
      number: cross.number,
      description: descr || "Описание отсутствует",
      price: parseFloat(cross.price),
      count: cross.count,
      stock: cross.stock
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <CrossesTableHead />
          <CrossesTableBody
            crosses={currentCrosses}
            descr={descr}
            properties={properties}
            images={images}
            onUpdateCount={updateCrossCount}
            onOpenImageModal={url => openImageModal("image", url)}
            onOpenInfoModal={openInfoModal}
            onAddToCart={index =>
              addToCart({
                ...currentCrosses[index],
                number: currentCrosses[index].numberFix,
                description: descr || "Описание отсутствует"
              })
            }
          />
        </Table>
      </TableContainer>
      <OrdersPagination
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
