"use client";

import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { Metadata } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { mockOrders } from "@/features/office/orders/common/orders-mock.data";
import { orderStatusDetails } from "@/features/office/orders/common/orders.data";

import { Button } from "@/components/ui/buttons/Button";
import { DatePickerComponent } from "@/components/ui/date-picker/DatePicker";
import { FilterInput } from "@/components/ui/forms/inputs/filter/FilterInput";
import { FilterSelect } from "@/components/ui/forms/inputs/filter/FilterSelect";

import styles from "@/styles/pages/office/orders/Orders.module.css";

import { isWithinInterval, parseISO } from "date-fns";

export const metadata: Metadata = {
  title: "Заказы | Rotazap",
  description:
    "Страница 'Заказы' интернет-магазина автомобильных запчастей для иномарок Rotazap"
};

interface OrdersFilterForm {
  article: string;
  order_status: string;
  date_range: [Date | null, Date | null];
}

export const OrdersTemplate = () => {
  const { control, handleSubmit, reset } = useForm<OrdersFilterForm>({
    defaultValues: {
      article: "",
      order_status: "",
      date_range: [null, null]
    }
  });

  const [filteredOrders, setFilteredOrders] = useState(mockOrders);
  const [page, setPage] = useState(1); // Текущая страница
  const rowsPerPage = 10; // Количество строк на странице

  const statusOptions = orderStatusDetails.map(status => status.title);

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  ); // Отображаемые заказы на текущей странице

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }; // Обработчик изменения страницы

  const onSubmit = (filters: OrdersFilterForm) => {
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
    setPage(1); // сбросить на первую страницу при фильтрации
  };

  const handleReset = () => {
    reset();
    setFilteredOrders(mockOrders);
    setPage(1); // сбросить на первую страницу при сбросе
  };

  return (
    <div className="officePage">
      <h2 className="officePageTitle">Заказы</h2>
      <div className="officePageContent">
        <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
          <div className={styles.filterContainer}>
            <DatePickerComponent control={control} name="date_range" />
            <FilterInput
              control={control}
              label="Артикул детали"
              name="article"
              type="text"
            />
            <FilterSelect
              control={control}
              name="order_status"
              label="Статус заказа"
              options={statusOptions}
            />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button type="submit" size="Small">
              Применить фильтр
            </Button>
            <Button type="reset" size="Small" variant="SecondaryOutline">
              Сбросить фильтр
            </Button>
          </div>
        </form>

        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", marginTop: 3 }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  ".MuiTableCell-root": {
                    height: "48px",
                    padding: "10px 16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5"
                  }
                }}
              >
                <TableCell>Деталь</TableCell>
                <TableCell>Откуда</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Цена(руб.)</TableCell>
                <TableCell>Кол-во</TableCell>
                <TableCell>Сумма(руб.)</TableCell>
                <TableCell>Статус заказа</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.article}</TableCell>
                  <TableCell>{order.source}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
              {paginatedOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Нет подходящих заказов
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {filteredOrders.length > rowsPerPage && (
          <Pagination
            count={Math.ceil(filteredOrders.length / rowsPerPage)}
            page={page}
            showFirstButton
            showLastButton
            onChange={handlePageChange}
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          />
        )}
      </div>
    </div>
  );
};
