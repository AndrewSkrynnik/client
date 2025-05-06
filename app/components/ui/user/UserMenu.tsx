"use client";

import Link from "next/link";

import { userMenuItems } from "@/config/userMenuItems";

import { useCurrentPath } from "@/hooks/useCurrentPath";

import styles from "@/styles/components/ui/user/User.module.css";

interface AccountMenuProps {
  filterIds?: number[];
  onClose?: () => void;
}

export const UserMenu = ({ filterIds, onClose }: AccountMenuProps) => {
  const pathname = useCurrentPath();
  const filteredItems = filterIds
    ? userMenuItems.filter(item => filterIds.includes(item.id))
    : userMenuItems;

  return (
    <>
      {filteredItems.map(item => (
        <li key={item.id} onClick={onClose}>
          <Link
            className={`${styles.link} rounded-md ${
              item.disabled ? styles.disabledLink : ""
            } ${pathname === item.href ? styles.activeLink : ""}`}
            href={item.disabled ? "#" : item.href}
            aria-disabled={item.disabled}
            onClick={e => item.disabled && e.preventDefault()}
          >
            <item.icon fontSize="medium" />
            <p>{item.title}</p>
          </Link>
        </li>
      ))}
    </>
  );
};
