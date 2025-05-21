import { LocalStorageKeys, ThemeVariants } from 'src/types';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeVariants>(
    (localStorage.getItem(LocalStorageKeys.THEME) as ThemeVariants) ||
      ThemeVariants.DARK,
  );

  const handleSetTheme = (themeValue: ThemeVariants) => {
    setTheme(themeValue);
    localStorage.setItem(LocalStorageKeys.THEME, themeValue);

    if (themeValue === ThemeVariants.DARK) {
      document.documentElement.classList.add(ThemeVariants.DARK);
    } else {
      document.documentElement.classList.remove(ThemeVariants.DARK);
    }
  };

  useEffect(() => {
    handleSetTheme(theme);
  }, [theme]);

  return { theme, setTheme, handleSetTheme };
};
