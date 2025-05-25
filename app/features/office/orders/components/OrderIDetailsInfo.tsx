"use client";

import { exportOrderToExcel } from "@/features/office/orders/common/export-order-to-excel.utils";
import { formatCurrency } from "@/features/office/orders/data/orders-table.format";
import { OrderTableItem } from "@/features/office/orders/types";

import { DownloadForOfflineIcon } from "@/components/icons";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

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
              order.details
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
        <span>Адрес доставки:</span> {order.address}
      </li>
      <li className={styles.orderInfoItem}>
        <span>Сумма заказа:</span>
        {formatCurrency(
          order.details.reduce((sum, item) => sum + item.totalPrice, 0)
        )}
      </li>
    </ul>
  </div>
);
