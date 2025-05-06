import {
  AccountBalanceWalletIcon,
  ArticleIcon,
  AssignmentReturnIcon,
  ContactPageIcon,
  DownloadForOfflineIcon,
  FavoriteIcon,
  ForwardIcon,
  SettingsIcon,
  ShoppingCartIcon,
  SwitchAccountIcon,
  ViewQuiltIcon
} from "@/components/icons";

export interface MenuItemConfig {
  id: number;
  href: string;
  title: string;
  icon: React.ComponentType<{
    className?: string;
    fontSize?: "small" | "medium" | "large";
  }>;
  disabled?: boolean;
}

export const userMenuItems: MenuItemConfig[] = [
  {
    id: 0,
    href: "/office/account",
    title: "Учетная запись",
    disabled: false,
    icon: SwitchAccountIcon
  },
  {
    id: 1,
    href: "/office/orders",
    title: "Заказы",
    disabled: false,
    icon: ViewQuiltIcon
  },
  {
    id: 2,
    href: "/office/refunds",
    title: "Возвраты",
    disabled: false,
    icon: AssignmentReturnIcon
  },
  {
    id: 3,
    href: "/office/basket",
    title: "Корзина",
    disabled: false,
    icon: ShoppingCartIcon
  },
  {
    id: 4,
    href: "/office/favorites",
    title: "Избранное",
    disabled: true,
    icon: FavoriteIcon
  },
  {
    id: 5,
    href: "/office/upload-files",
    title: "Загрузка из файла",
    disabled: false,
    icon: DownloadForOfflineIcon
  },
  {
    id: 6,
    href: "/office/documents",
    title: "Документы",
    disabled: false,
    icon: ArticleIcon
  },
  {
    id: 7,
    href: "/office/statutory-documents",
    title: "Уставные документы",
    disabled: false,
    icon: ContactPageIcon
  },
  {
    id: 8,
    href: "/orders/balance",
    title: "Баланс",
    disabled: true,
    icon: AccountBalanceWalletIcon
  },
  {
    id: 9,
    href: "/office/settings",
    title: "Настройки",
    disabled: false,
    icon: SettingsIcon
  },
  {
    id: 10,
    href: "/dashboard",
    title: "На главную",
    disabled: false,
    icon: ForwardIcon
  }
];
