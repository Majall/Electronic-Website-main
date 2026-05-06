import { useEffect, useState } from "react";

const THEME_KEY = "theme";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggle = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, toggle };
};

export default useTheme;
