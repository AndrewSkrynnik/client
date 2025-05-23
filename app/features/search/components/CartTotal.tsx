import { ShoppingCartIcon } from "@/components/icons";

import styles from "@/styles/pages/search/Search.module.css";

interface CartTotalProps {
  count: number;
  onAddToCart: () => void;
}

export const CartTotal = ({ count, onAddToCart }: CartTotalProps) => (
  <button
    className={styles.cartTotal}
    onClick={onAddToCart}
    disabled={count === 0}
  >
    <ShoppingCartIcon sx={{ fontSize: 24 }} />
  </button>
);
