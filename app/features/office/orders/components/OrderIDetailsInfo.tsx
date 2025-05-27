"use client";

import { OrderTableItem } from "@/features/office/orders/types";
import { exportOrderToExcel } from "@/features/office/orders/utils/export-order-to-excel";

import { DownloadForOfflineIcon } from "@/components/icons";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

import { formatNumber } from "@/utils/format-number";

import styles from "@/styles/pages/office/orders/Orders.module.css";

import { format } from "date-fns";

interface OrderInfoProps {
  order: OrderTableItem;
}

export const OrderDetailsInfo = ({ order }: OrderInfoProps) => (
  <div className={styles.orderInfoContainer}>
    <div className={styles.orderInfoHeader}>
      <h3 className={styles.orderInfoTitle}>Заказ №{order.id}</h3>
      <TooltipComponent title="Выгрузить заказ в Excel">
        <DownloadForOfflineIcon
          onClick={() =>
            exportOrderToExcel(
              order.id,
              order.orderDate,
              order.address,
              order.details,
              order.fullName
            )
          }
          fontSize="large"
          className="closeButton"
        />
      </TooltipComponent>
    </div>

    <ul className={styles.orderInfoList}>
      <li className={styles.orderInfoItem}>
        <span>Дата заказа:</span>
        {format(order.orderDate, "dd.MM.yyyy")}
      </li>
      <li className={styles.orderInfoItem}>
        <span>ФИО клиента:</span> {order.fullName}
      </li>
      <li className={styles.orderInfoItem}>
        <span>Адрес доставки:</span> {order.address}
      </li>
      <li className={styles.orderInfoItem}>
        <span>Сумма заказа:</span>
        {formatNumber(
          order.details.reduce((sum, item) => sum + item.totalPrice, 0)
        )}{" "}
        руб.
      </li>
    </ul>
  </div>
);
