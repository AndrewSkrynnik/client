"use client";

import { useEffect } from "react";

const setFavicon = (href: string) => {
  const head = document.head;

  head.querySelectorAll("link[rel='icon']").forEach(icon => icon.remove());

  // Генерируем query-параметр (timestamp или hash)
  const cacheBuster = `?v=${Date.now()}`;
  const newIcon = document.createElement("link");
  newIcon.rel = "icon";
  newIcon.href = `${href}${cacheBuster}`;

  head.appendChild(newIcon);
};

export const DynamicFavicon = () => {
  useEffect(() => {
    const applyFavicon = (isDark: boolean) => {
      const href = isDark
        ? "/icons/favicon-dark.ico"
        : "/icons/favicon-light.ico";
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
