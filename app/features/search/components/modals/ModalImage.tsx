"use client";

import Image from "next/image";

import { OrderModal } from "@/features/office/orders/components/OrderModal";

interface ModalImageProps {
  imageUrl: string;
  open: boolean;
  onClose: () => void;
}

export const ModalImage = ({ imageUrl, open, onClose }: ModalImageProps) => (
  <OrderModal open={open} onClose={onClose}>
    <Image
      src={imageUrl}
      alt="Изображение детали"
      width={400}
      height={400}
      className="rounded border object-contain"
      placeholder="blur"
      blurDataURL="/no-image.png"
    />
  </OrderModal>
);
