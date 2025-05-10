"use client";

import styles from "../SearchResult.module.css";

interface ModalInfoProps {
  properties: Record<string, string>;
  onClose: () => void;
}

export const ModalInfo = ({ properties, onClose }: ModalInfoProps) => (
  <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className={styles.modalClose}>
        ✖
      </button>
      <h3 className="mb-4 text-lg font-semibold">Характеристики товара</h3>
      <ul className="list-disc text-gray-800">
        {Object.entries(properties || {}).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
