"use client";

import { useEffect } from "react";

const setFavicon = (href: string) => {
  const head = document.head;

  // Удаляем все старые favicon
  const existingIcons = head.querySelectorAll("link[rel='icon']");
  existingIcons.forEach(icon => icon.remove());

  // Создаём новую ссылку
  const newIcon = document.createElement("link");
  newIcon.rel = "icon";
  newIcon.href = href;
  head.appendChild(newIcon);
};

export const DynamicFavicon = () => {
  useEffect(() => {
    const applyFavicon = (isDark: boolean) => {
      const href = isDark ? "/favicon-dark.ico" : "/favicon-light.ico";
      setFavicon(href);
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // начальная установка
    applyFavicon(mediaQuery.matches);

    // обработчик изменений темы
    const handleChange = (e: MediaQueryListEvent) => applyFavicon(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return null;
};
