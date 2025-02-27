import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<string>();

  const defaultTheme = () => {
    const themeLocalStorage = localStorage.getItem('ui-theme');
    const themeSystem = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    return themeLocalStorage ?? themeSystem;
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (!theme) {
      setTheme(defaultTheme());
      return;
    }

    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('ui-theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
};
