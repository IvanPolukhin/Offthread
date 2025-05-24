import { ThemeVariants } from 'src/types';

export type ThemeContextType = {
  theme: ThemeVariants;
  setTheme: (theme: ThemeVariants) => void;
};
