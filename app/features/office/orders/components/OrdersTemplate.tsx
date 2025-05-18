"use client";

import { useState } from "react";

import { mockOrders } from "@/features/office/orders/common/orders-mock.data";
import { OrdersPagination } from "@/features/office/orders/components/OrdersPagination";
import { OrdersForm } from "@/features/office/orders/components/forms/OrdersForm";
import { OrdersTable } from "@/features/office/orders/components/tables/OrdersTable";
import {
  OrderTableItem,
  OrdersFilterValues
} from "@/features/office/orders/types";

import { isWithinInterval, parseISO } from "date-fns";

export const OrdersTemplate = () => {
  const [filteredOrders, setFilteredOrders] =
    useState<OrderTableItem[]>(mockOrders);
  const [page, setPage] = useState<number>(1);

  const rowsPerPage = 10;

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const handleFilter = (filters: OrdersFilterValues): void => {
    const { article, order_status, date_range } = filters;

    const result = mockOrders.filter(order => {
      const matchArticle = article
        ? order.article.toLowerCase().includes(article.toLowerCase())
        : true;

      const matchStatus = order_status ? order.status === order_status : true;

      const matchDate =
        Array.isArray(date_range) && date_range[0] && date_range[1]
          ? isWithinInterval(parseISO(order.date), {
              start: date_range[0],
              end: date_range[1]
            })
          : true;

      return matchArticle && matchStatus && matchDate;
    });

    setFilteredOrders(result);
    setPage(1);
  };

  const handleReset = (): void => {
    setFilteredOrders(mockOrders);
    setPage(1);
  };

  return (
    <div className="officePage">
      <h2 className="officePageTitle">Заказы</h2>
      <div className="officePageContent">
        <OrdersForm onFilter={handleFilter} onReset={handleReset} />

        <OrdersTable orders={paginatedOrders} />
        <OrdersPagination
          totalItems={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          currentPage={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
