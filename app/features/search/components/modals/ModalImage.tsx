"use client";

import Image from "next/image";

import styles from "../SearchResult.module.css";

interface ModalImageProps {
  imageUrl: string;
  onClose: () => void;
}

export const ModalImage = ({ imageUrl, onClose }: ModalImageProps) => (
  <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className={styles.modalClose}>
        ✖
      </button>
      <h3 className="mb-4 text-lg font-semibold">Просмотр изображения</h3>
      <Image
        src={imageUrl}
        alt="Изображение детали"
        width={400}
        height={400}
        className="rounded border object-contain"
        placeholder="blur"
        blurDataURL="/no-image.png"
      />
    </div>
  </div>
);
