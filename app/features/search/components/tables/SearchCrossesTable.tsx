"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { CartTotal } from "@/features/search/components/CartTotal";
import { Counter } from "@/features/search/components/Counter";
import { Pagination } from "@/features/search/components/Pagination";
import { ModalImage } from "@/features/search/components/modals/ModalImage";
import { ModalInfo } from "@/features/search/components/modals/ModalInfo";
import { CrossesTableProps } from "@/features/search/types";

import { CameraAltIcon, InfoIcon } from "@/components/icons";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

const TABLE_HEAD_ITEMS = [
  "Производитель",
  "Артикул",
  "Описание",
  "Инфо",
  "Цена (₽)",
  "Наличие (шт)",
  "Количество",
  "Итого"
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
    info?: string;
  }>({
    image: searchParams.get("image") || undefined,
    info: searchParams.get("info") || undefined
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
  const totalPages = Math.ceil(crossesWithData.length / ROWS_PER_PAGE);
  const currentCrosses = crossesWithData.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const closeModal = useCallback(() => {
    setModalState({ image: undefined, info: undefined });
    router.replace("?", { scroll: false });
  }, [router]);

  const openModal = (type: "image" | "info", value: string) => {
    setModalState(prev => ({ ...prev, [type]: value }));
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
    <div className="flex flex-col gap-y-4">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {TABLE_HEAD_ITEMS.map((item, index) => (
              <th
                key={index}
                className="border border-gray-300 px-2 py-2 text-center"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentCrosses.map((cross, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {cross.brand}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {cross.numberFix}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {descr || "Описание отсутствует"}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="flex justify-center gap-2">
                  <TooltipComponent title="Информация о товаре">
                    <InfoIcon
                      onClick={() => openModal("info", cross.numberFix)}
                      sx={{ cursor: "pointer" }}
                    />
                  </TooltipComponent>
                  {images?.length > 0 && images[0]?.url && (
                    <TooltipComponent title="Просмотр изображения">
                      <CameraAltIcon
                        onClick={() => openModal("image", images[0].url)}
                        sx={{ cursor: "pointer" }}
                      />
                    </TooltipComponent>
                  )}
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {cross.price}
              </td>
              <td className="w-[80px] border border-gray-300 px-4 py-2 text-center">
                {cross.stock}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <Counter
                  index={(currentPage - 1) * ROWS_PER_PAGE + index} // Глобальный индекс
                  count={cross.count}
                  stock={cross.stock}
                  price={cross.price}
                  updateCount={updateCount}
                  handleInputChange={handleInputChange}
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <CartTotal
                  price={cross.price}
                  count={cross.count}
                  onAddToCart={() =>
                    addToCart(
                      index,
                      (parseFloat(cross.price) * cross.count).toFixed(2)
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      {modalState.image && (
        <ModalImage imageUrl={modalState.image} onClose={closeModal} />
      )}
      {modalState.info && (
        <ModalInfo properties={properties || {}} onClose={closeModal} />
      )}
    </div>
  );
};
