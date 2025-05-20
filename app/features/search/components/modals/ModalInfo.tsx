import { OrderModal } from "@/features/office/orders/components/OrderModal";

import styles from "@/styles/pages/search-results/SearchResults.module.css";

interface ModalInfoProps {
  properties: Record<string, string>;
  open: boolean;
  onClose: () => void;
}

export const ModalInfo = ({ properties, open, onClose }: ModalInfoProps) => (
  <OrderModal open={open} onClose={onClose}>
    <div className={styles.modalInfo}>
      <h3 className={styles.modalInfoTitle}>Характеристики товара</h3>
      <ul className={styles.modalInfoList}>
        {Object.entries(properties).map(([key, value]) => (
          <li className={styles.modalInfoItem} key={key}>
            <p>{key}:</p>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  </OrderModal>
);
