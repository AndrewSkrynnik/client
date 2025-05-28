"use client";

import { useMemo, useState } from "react";

import { OrdersForm } from "@/features/office/orders/components/forms/OrdersForm";
import { OrdersTable } from "@/features/office/orders/components/tables/OrdersTable";
import { OrdersFilters } from "@/features/office/orders/types";
import { filterOrders } from "@/features/office/orders/utils/filter-orders";

import { PaginationComponent } from "@/components/ui/pagination/PaginationComponent";

import { useOrderSync } from "@/hooks/useOrderSync";

import { useOrderStore } from "@/store/useOrderStore";

// 👈

import { paginate } from "@/utils/paginate";

import { ORDERS_PAGINATION } from "@/common/constants";

export const OrdersTemplate = () => {
  useOrderSync(); // локальная инициализация

  const orders = useOrderStore(state => state.orders);
  const hasHydrated = useOrderStore(state => state.hasHydrated);

  const [filters, setFilters] = useState<OrdersFilters>({});
  const [page, setPage] = useState(1);

  const sortedOrders = useMemo(
    () =>
      [...orders].sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      ),
    [orders]
  );

  const filteredOrders = useMemo(
    () => filterOrders(sortedOrders, filters),
    [sortedOrders, filters]
  );

  const paginatedOrders = useMemo(
    () => paginate(filteredOrders, page, ORDERS_PAGINATION),
    [filteredOrders, page]
  );

  const handleFilter = (newFilters: OrdersFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleReset = () => {
    setFilters({});
    setPage(1);
  };

  if (!hasHydrated) return <p>Загрузка заказов...</p>;

  return (
    <div className="officePage">
      <h2 className="officePageTitle">Заказы</h2>
      <div className="officePageContent">
        <OrdersForm onFilter={handleFilter} onReset={handleReset} />
        <OrdersTable
          orders={paginatedOrders}
          highlightArticle={filters.article}
        />
        <PaginationComponent
          totalItems={filteredOrders.length}
          rowsPerPage={ORDERS_PAGINATION}
          currentPage={page}
          onChange={setPage}
        />
      </div>
    </div>
  );
};
