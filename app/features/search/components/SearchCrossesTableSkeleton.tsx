import { Skeleton } from "@mui/material";

export const SearchCrossesTableSkeleton = () => {
  const rows = Array.from({ length: 5 });

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1000px] table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm font-semibold text-gray-600">
            <th>Производитель</th>
            <th>Артикул</th>
            <th>Описание</th>
            <th>Инфо</th>
            <th>Цена (₽)</th>
            <th>Наличие (шт)</th>
            <th>Количество</th>
            <th>Итого</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, i) => (
            <tr key={i} className="text-sm">
              <td>
                <Skeleton width={80} />
              </td>
              <td>
                <Skeleton width={100} />
              </td>
              <td>
                <Skeleton width={180} />
              </td>
              <td>
                <Skeleton variant="circular" width={24} height={24} />
              </td>
              <td>
                <Skeleton width={60} />
              </td>
              <td>
                <Skeleton width={40} />
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <Skeleton width={24} height={24} variant="rectangular" />
                  <Skeleton width={24} height={24} variant="rectangular" />
                  <Skeleton width={24} height={24} variant="rectangular" />
                </div>
              </td>
              <td>
                <Skeleton width={60} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
