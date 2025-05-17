import { ComponentType } from "react";

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
  icon: ComponentType<{
    className?: string;
    fontSize?: "small" | "medium" | "large";
  }>;
  disabled?: boolean;
  render?: boolean;
}

export const userMenuItems: MenuItemConfig[] = [
  {
    id: 0,
    href: "/office/account",
    title: "Учетная запись",
    disabled: false,
    render: true,
    icon: SwitchAccountIcon
  },
  {
    id: 1,
    href: "/office/orders",
    title: "Заказы",
    disabled: false,
    render: true,
    icon: ViewQuiltIcon
  },
  {
    id: 2,
    href: "/office/refunds",
    title: "Возвраты",
    disabled: false,
    render: true,
    icon: AssignmentReturnIcon
  },
  {
    id: 3,
    href: "/office/basket",
    title: "Корзина",
    disabled: false,
    render: true,
    icon: ShoppingCartIcon
  },
  {
    id: 4,
    href: "/office/favorites",
    title: "Избранное",
    disabled: false,
    render: false,
    icon: FavoriteIcon
  },
  {
    id: 5,
    href: "/office/upload-files",
    title: "Загрузка из файла",
    disabled: false,
    render: false,
    icon: DownloadForOfflineIcon
  },
  {
    id: 6,
    href: "/office/documents",
    title: "Документы",
    disabled: false,
    render: false,
    icon: ArticleIcon
  },
  {
    id: 7,
    href: "/office/statutory-documents",
    title: "Уставные документы",
    disabled: false,
    render: false,
    icon: ContactPageIcon
  },
  {
    id: 8,
    href: "/orders/balance",
    title: "Баланс",
    disabled: false,
    render: false,
    icon: AccountBalanceWalletIcon
  },
  {
    id: 9,
    href: "/office/settings",
    title: "Настройки",
    disabled: false,
    render: false,
    icon: SettingsIcon
  },
  {
    id: 10,
    href: "/",
    title: "На главную",
    disabled: false,
    render: true,
    icon: ForwardIcon
  }
];
