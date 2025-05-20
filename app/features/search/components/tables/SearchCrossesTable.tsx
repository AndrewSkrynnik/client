"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { OrdersPagination } from "@/features/office/orders/components/OrdersPagination";
import { CartTotal } from "@/features/search/components/CartTotal";
import { Counter } from "@/features/search/components/Counter";
import { ModalImage } from "@/features/search/components/modals/ModalImage";
import { ModalInfo } from "@/features/search/components/modals/ModalInfo";
import { CrossesTableProps } from "@/features/search/types";

import { CameraAltIcon, InfoIcon } from "@/components/icons";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

const TABLE_HEAD_ITEMS = [
  "Бренд",
  "Артикул",
  "Описание",
  "Инфо",
  "Цена (₽)",
  "Наличие (шт)",
  "Количество",
  " "
];

const ROWS_PER_PAGE = 20;

export const SearchCrossesTable = ({
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
    const storedData = localStorage.getItem("crossesData");
    if (storedData) {
      setCrossesWithData(
        JSON.parse(storedData).map((item: any) => ({
          ...item,
          count: isNaN(item.count) ? 0 : item.count
        }))
      );
    } else {
      const newData = crosses.map(cross => ({
        ...cross,
        price: (Math.random() * (10000 - 1000) + 1000).toFixed(2),
        stock: Math.floor(Math.random() * 51),
        count: 0
      }));
      setCrossesWithData(newData);
      localStorage.setItem("crossesData", JSON.stringify(newData));
    }
  }, [crosses]);

  const updateCount = (rowIndex: number, value: number) => {
    setCrossesWithData(prevState => {
      const globalIndex = (currentPage - 1) * ROWS_PER_PAGE + rowIndex; // Глобальный индекс

      return prevState.map((item, index) => {
        if (index === globalIndex) {
          return {
            ...item,
            count: Math.max(0, Math.min(item.stock, item.count + value))
          };
        }
        return item;
      });
    });
  };

  const handleInputChange = (rowIndex: number, value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setCrossesWithData(prevState => {
        const globalIndex = (currentPage - 1) * ROWS_PER_PAGE + rowIndex;

        return prevState.map((item, index) => {
          if (index === globalIndex) {
            return {
              ...item,
              count: Math.max(0, Math.min(item.stock, parsedValue))
            };
          }
          return item;
        });
      });
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const currentCrosses = crossesWithData.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
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

  const addToCart = (index: number, totalPrice: string) => {
    console.log(
      `Добавлено в корзину: ${crossesWithData[index].brand} - ${crossesWithData[index].numberFix}, на сумму ${totalPrice}₽`
    );

    setCrossesWithData(prevState =>
      prevState.map((item, idx) =>
        idx === index ? { ...item, count: 0 } : item
      )
    );
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5"
              }}
            >
              {TABLE_HEAD_ITEMS.map((label, index) => (
                <TableCell
                  key={index}
                  align="center"
                  sx={{
                    height: 48,
                    padding: "8px 16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                    textAlign: "center"
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentCrosses.map((cross, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    height: 48,
                    width: 140,
                    padding: "8px 16px",
                    textAlign: "center"
                  }}
                >
                  {cross.brand}
                </TableCell>
                <TableCell
                  sx={{
                    height: 48,
                    width: 140,
                    padding: "8px 16px",
                    textAlign: "center"
                  }}
                >
                  {cross.numberFix}
                </TableCell>
                <TableCell
                  sx={{
                    height: 48,
                    width: 240,
                    padding: "8px 16px",
                    textAlign: "center"
                  }}
                >
                  {descr || "Описание отсутствует"}
                </TableCell>
                <TableCell
                  sx={{
                    height: 48,
                    width: 56,
                    padding: "8px 16px",
                    textAlign: "center"
                  }}
                >
                  <div className="flex justify-center gap-2">
                    <TooltipComponent title="Информация о товаре">
                      <InfoIcon
                        onClick={() => openInfoModal(properties)}
                        sx={{ cursor: "pointer" }}
                      />
                    </TooltipComponent>
                    {images?.length > 0 && images[0]?.url && (
                      <TooltipComponent title="Просмотр изображения">
                        <CameraAltIcon
                          onClick={() => openImageModal("image", images[0].url)}
                          sx={{ cursor: "pointer" }}
                        />
                      </TooltipComponent>
                    )}
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    height: 48,
                    width: 110,
                    padding: "8px 16px",
                    textAlign: "center"
                  }}
                >
                  {cross.price}
                </TableCell>
                <TableCell
                  sx={{
                    height: 48,
                    width: 56,
                    padding: "8px 16px",
                    textAlign: "center"
                  }}
                >
                  {cross.stock}
                </TableCell>
                <TableCell
                  sx={{
                    height: 48,
                    width: 140,
                    padding: "8px 16px",
                    textAlign: "center"
                  }}
                >
                  <Counter
                    index={(currentPage - 1) * ROWS_PER_PAGE + index}
                    count={cross.count}
                    stock={cross.stock}
                    price={cross.price}
                    updateCount={updateCount}
                    handleInputChange={handleInputChange}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    height: 48,
                    width: 56,
                    padding: "8px 16px",
                    textAlign: "center"
                  }}
                >
                  <CartTotal
                    count={cross.count}
                    onAddToCart={() =>
                      addToCart(
                        index,
                        (parseFloat(cross.price) * cross.count).toFixed(2)
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <OrdersPagination
        totalItems={crossesWithData.length}
        rowsPerPage={ROWS_PER_PAGE}
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
