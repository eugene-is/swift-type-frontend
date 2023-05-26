import { useLayoutEffect, useState } from 'react';

/**
 * Хук для управления темой приложения.
 * 
 * @returns {object} - Возвращает объект со значением текущей темы и функцией для ее изменения.
 */

export const useTheme = () => {
  const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = isDarkTheme ? 'dark' : 'light';

  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || defaultTheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  return { theme, setTheme };
};