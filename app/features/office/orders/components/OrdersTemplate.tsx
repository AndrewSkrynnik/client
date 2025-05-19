"use client";

import { useMemo, useState } from "react";

import { ROWS_PER_PAGE } from "@/features/office/orders/common/constants";
import { filterOrders } from "@/features/office/orders/common/filter-orders";
import { paginate } from "@/features/office/orders/common/paginate";
import { OrdersPagination } from "@/features/office/orders/components/OrdersPagination";
import { OrdersForm } from "@/features/office/orders/components/forms/OrdersForm";
import { OrdersTable } from "@/features/office/orders/components/tables/OrdersTable";
import { orderMocks } from "@/features/office/orders/data/orders.mock";
import { OrdersFilters } from "@/features/office/orders/types";

export const OrdersTemplate = () => {
  const [filters, setFilters] = useState<OrdersFilters>({});
  const [page, setPage] = useState(1);

  const filteredOrders = useMemo(
    () => filterOrders(orderMocks, filters),
    [filters]
  );

  const paginatedOrders = useMemo(
    () => paginate(filteredOrders, page, ROWS_PER_PAGE),
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

  return (
    <div className="officePage">
      <h2 className="officePageTitle">Заказы</h2>
      <div className="officePageContent">
        <OrdersForm onFilter={handleFilter} onReset={handleReset} />
        <OrdersTable
          orders={paginatedOrders}
          highlightArticle={filters.article}
        />
        <OrdersPagination
          totalItems={filteredOrders.length}
          rowsPerPage={ROWS_PER_PAGE}
          currentPage={page}
          onChange={setPage}
        />
      </div>
    </div>
  );
};
