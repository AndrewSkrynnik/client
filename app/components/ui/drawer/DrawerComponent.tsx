"use client";

import Link from "next/link";
import { KeyboardEvent, MouseEvent, ReactNode, useState } from "react";

import {
  DonutSmallIcon,
  HomeIcon,
  ImportContactsIcon,
  LiveHelpIcon,
  LocalShippingIcon,
  LocationOnIcon,
  MailIcon,
  PeopleAltIcon,
  PhoneIcon,
  SyncIcon,
  WorkspacePremiumIcon
} from "@/components/icons";
import { StyledDrawer } from "@/components/styled/StyledDrawer";
import { DrawerButton } from "@/components/ui/drawer/DrawerButton";

import { useCurrentPath } from "@/hooks/useCurrentPath";

import styles from "@/styles/components/ui/drawer/Drawer.module.css";

interface MenuItem {
  id: number;
  title: string;
  path: string;
  icon: ReactNode;
  target?: string;
}

const navLinks = [
  { id: 0, title: "Главная", path: "/", icon: <HomeIcon /> },
  {
    id: 1,
    title: "О компании",
    path: "/info/about-company",
    icon: <ImportContactsIcon />
  },
  {
    id: 2,
    title: "Поставщикам",
    path: "/info/provider",
    icon: <DonutSmallIcon />
  },
  {
    id: 3,
    title: "Оптовым покупателям",
    path: "/info/wholesale",
    icon: <PeopleAltIcon />
  },
  { id: 4, title: "Контакты", path: "/info/contacts", icon: <LiveHelpIcon /> },
  {
    id: 5,
    title: "Доставка",
    path: "/info/delivery",
    icon: <LocalShippingIcon />
  },
  {
    id: 6,
    title: "Гарантия и возврат",
    path: "/info/warranty-refund",
    icon: <WorkspacePremiumIcon />
  },
  {
    id: 7,
    title: "ЭДО",
    path: "/info/workflow",
    icon: <SyncIcon />
  },
  {
    id: 8,
    title: "+7(916)393-43-69",
    path: "tel:79163935369",
    icon: <PhoneIcon />
  },
  {
    id: 9,
    title: "info@rotazap.ru",
    path: "mailto:info@rotazap.ru",
    icon: <MailIcon />
  },
  {
    id: 10,
    title: "141068, М.О., г.Королев,  мкр.Текстильщик, ул.Южная, д.3",
    path: "https://yandex.ru/maps/-/CCUG56vKPD",
    target: "__blank",
    icon: <LocationOnIcon />
  }
];

type Anchor = "left";

export const DrawerComponent = () => {
  const pathname = useCurrentPath();
  const [state, setState] = useState({
    left: false
  });
  const disabledPaths = ["/auth", "/confirmation", "/forgot-password"];

  const toggleDrawer =
    (anchor: Anchor) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(prevState => ({ ...prevState, [anchor]: !prevState[anchor] }));
    };

  const renderMenuItems = (
    items: MenuItem[],
    additionalClasses = "",
    isInfoSection = false
  ) =>
    items.map(item => {
      const isDisabled =
        item.title === "Главная" && disabledPaths.includes(pathname);

      return (
        <li
          className={`${styles.drawerListItem} ${
            isDisabled ? styles.disabledItem : ""
          }`}
          key={item.title}
        >
          <Link
            className={`${styles.drawerLinkBase} ${isInfoSection ? styles.drawerLinkInfo : styles.drawerLink} ${
              pathname === item.path ? styles.activeLink : ""
            } ${additionalClasses}`}
            href={item.path}
            target={item.target || "_self"}
          >
            {item.icon}
            <p
              className={
                isInfoSection
                  ? styles.drawerListItemTextInfo
                  : styles.drawerListItemText
              }
            >
              {item.title}
            </p>
          </Link>
        </li>
      );
    });

  const list = (anchor: Anchor) => (
    <nav
      className={styles.navigation}
      role="presentation"
      onClick={event => {
        const target = event.target as HTMLElement;

        // Игнорируем клик, если клик по disabled элементу
        if (target.closest(`.${styles.disabledItem}`)) return;

        toggleDrawer(anchor)(event);
      }}
      onKeyDown={event => {
        const target = event.target as HTMLElement;

        if (target.closest(`.${styles.disabledItem}`)) return;

        toggleDrawer(anchor)(event);
      }}
    >
      <ul className={styles.drawerList}>
        {renderMenuItems(navLinks.filter(item => item.id >= 0 && item.id <= 4))}
        <hr className="my-2 h-px w-full text-white" />
        {renderMenuItems(navLinks.filter(item => item.id >= 5 && item.id <= 7))}
        <hr className="my-2 h-px w-full text-white" />
        {renderMenuItems(
          navLinks.filter(item => item.id >= 8 && item.id <= 10),
          "",
          true
        )}
      </ul>
    </nav>
  );

  return (
    <>
      <DrawerButton onClick={toggleDrawer("left")} />
      <StyledDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left")}
      >
        {list("left")}
      </StyledDrawer>
    </>
  );
};
