"use client";

import { IconButton, Menu } from "@mui/material";
import router from "next/router";
import { MouseEvent, useState } from "react";

import { AccountCircleIcon, ExitToAppIcon } from "@/components/icons";
import { UserInfo } from "@/components/ui/user/UserInfo";
import { UserMenu } from "@/components/ui/user/UserMenu";

import { useAuth } from "@/hooks/useAuth";

import styles from "@/styles/components/layout/header/Header.module.css";

export const HeaderUserMenu = () => {
  const { logoutMutation } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const defaultFilterIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/auth"); // Перенаправляем пользователя на страницу /auth
      }
    });
  };

  return (
    <>
      <div onClick={handleClick} className={styles.userMenuIconWrapper}>
        <IconButton
          disableRipple
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <AccountCircleIcon fontSize="large" className={styles.userMenuIcon} />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          top: "10px",

          "& .MuiMenu-list": {
            padding: "0"
          },

          "& .MuiMenu-paper": { borderRadius: "6px" }
        }}
      >
        <UserInfo />
        <UserMenu filterIds={defaultFilterIds} onClose={handleClose} />
        <div className={styles.exitButtonContainer}>
          <li onClick={handleLogout} className={styles.link}>
            <ExitToAppIcon />
            <p>Выход</p>
          </li>
        </div>
      </Menu>
    </>
  );
};
