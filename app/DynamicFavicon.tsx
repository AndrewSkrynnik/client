"use client";

import { useEffect, useRef } from "react";

const setFavicon = (href: string) => {
  const head = document.head;

  head.querySelectorAll("link[rel*='icon']").forEach(link => link.remove());

  const versioned = `${href}?v=${Date.now()}`;

  const icon = document.createElement("link");
  icon.rel = "icon";
  icon.href = versioned;

  const shortcut = document.createElement("link");
  shortcut.rel = "shortcut icon";
  shortcut.href = versioned;

  head.appendChild(icon);
  head.appendChild(shortcut);
};

export const DynamicFavicon = () => {
  const lastIsDark = useRef<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (isDark: boolean) => {
      if (lastIsDark.current === isDark) return; // не менять, если тема не изменилась
      lastIsDark.current = isDark;

      const href = isDark
        ? "/icons/favicon-dark.ico"
        : "/icons/favicon-light.ico";

      console.log("💡 Theme changed! Dark mode:", isDark);
      setFavicon(href);
    };

    apply(mediaQuery.matches); // первая установка

    // Слушаем изменения системной темы
    const handler = (e: MediaQueryListEvent) => apply(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return null;
};
