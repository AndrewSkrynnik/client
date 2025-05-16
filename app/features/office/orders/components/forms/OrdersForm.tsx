"use client";

import { useForm } from "react-hook-form";

import { orderStatusDetails } from "@/features/office/orders/common/orders.data";
import { OrdersFilterForm } from "@/features/office/orders/types";

import { Button } from "@/components/ui/buttons/Button";
import { DatePickerComponent } from "@/components/ui/date-picker/DatePicker";
import { FilterInput } from "@/components/ui/forms/inputs/filter/FilterInput";
import { FilterSelect } from "@/components/ui/forms/inputs/filter/FilterSelect";

import styles from "@/styles/pages/office/orders/Orders.module.css";

export const OrdersForm = () => {
  const { control, handleSubmit, reset } = useForm<OrdersFilterForm>({
    defaultValues: {
      article: "",
      order_status: "",
      date_range: [null, null]
    }
  });
  // Преобразуем titles в массив строк
  const statusOptions = orderStatusDetails.map(status => status.title);

  const onSubmit = (data: OrdersFilterForm) => {
    // отправка запроса с параметрами фильтра
    console.log("Фильтр:", data);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
    >
      <DatePickerComponent
        control={control}
        name="date_range"
        label="Диапазон дат"
      />
      <div className={styles.formElementsContainer}>
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
      <div className={styles.formElementsContainer}>
        <Button size="Small" type="submit">
          Применить фильтр
        </Button>
        <Button size="Small" variant="SecondaryOutline" type="reset">
          Сбросить фильтр
        </Button>
      </div>
    </form>
  );
};
