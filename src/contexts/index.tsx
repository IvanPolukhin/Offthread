import { useContext, createContext } from 'react';

import { ThemeContextType } from 'src/contexts/types';

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeContext = (): ThemeContextType => {
  const data = useContext(ThemeContext);

  if (!data) {
    throw new Error('useThemeContext was used outside of its Provider');
  }

  return data;
};
