/* useAuthStore */
export interface User {
  id: number;
  email: string;
  username?: string;
  fullName?: string;
  phoneNumber?: string;
  role?: string;
  address: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  setAuth: (user: User) => void;
  logout: () => void;
  setAuthReady: (ready: boolean) => void;
  fetchUser: () => Promise<void>;
  updateUser: (updatedData: Partial<User>) => Promise<void>;
}

/* useBasketStore */
export interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface BasketState {
  items: BasketItem[];
  totalQuantity: number;
  totalPrice: number;
  loadBasket: (userId: number) => Promise<void>;
}
