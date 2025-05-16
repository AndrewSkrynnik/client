import { ru } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

// можно подключить свой стиль

interface DateRangeFilterInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export const DatePickerComponent = <T extends FieldValues>({
  control,
  name,
  label
}: DateRangeFilterInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <div>
        {label && <label>{label}</label>}
        <DatePicker
          selectsRange
          startDate={field.value?.[0] || null}
          endDate={field.value?.[1] || null}
          onChange={(update: [Date | null, Date | null]) => {
            field.onChange(update);
          }}
          dateFormat="dd.MM.yyyy"
          locale={ru}
          placeholderText="Выберите диапазон"
          isClearable
          monthsShown={2}
        />
      </div>
    )}
  />
);
