import { useThemeContext } from 'src/contexts';
import { ThemeVariants } from 'src/types';

export const useThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();

  const isDark = theme === ThemeVariants.DARK;

  const handleChange = (checked: boolean) => {
    const newTheme = checked ? ThemeVariants.DARK : ThemeVariants.LIGHT;
    setTheme(newTheme);
  };

  return {
    isDark,
    handleChange,
  };
};
