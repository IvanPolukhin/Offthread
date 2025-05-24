import { ThemeContext } from 'src/contexts';

import { Props } from 'src/contexts/ThemeContext/types.ts';

import { useTheme } from 'src/hooks/useTheme';

const ThemeProvider = ({ children }: Props) => {
  const themeData = useTheme();

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
