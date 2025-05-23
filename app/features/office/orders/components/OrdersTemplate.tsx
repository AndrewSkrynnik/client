"use client";

import { useMemo, useState } from "react";

import { filterOrders } from "@/features/office/orders/common/filter-orders";
import { paginate } from "@/features/office/orders/common/paginate";
import { OrdersForm } from "@/features/office/orders/components/forms/OrdersForm";
import { OrdersTable } from "@/features/office/orders/components/tables/OrdersTable";
import { orderMocks } from "@/features/office/orders/data/orders.mock";
import { OrdersFilters } from "@/features/office/orders/types";
import { ORDERS_PAGINATION } from "@/features/search/common/constants";

import { PaginationComponent } from "@/components/ui/pagination/PaginationComponent";

export const OrdersTemplate = () => {
  const [filters, setFilters] = useState<OrdersFilters>({});
  const [page, setPage] = useState(1);

  const filteredOrders = useMemo(
    () => filterOrders(orderMocks, filters),
    [filters]
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
