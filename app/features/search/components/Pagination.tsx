import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage
}) => (
  <div className="mt-4 flex items-center justify-center gap-4">
    <button
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Назад
    </button>
    <span>
      Страница {currentPage} из {totalPages}
    </span>
    <button
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Вперёд
    </button>
  </div>
);
