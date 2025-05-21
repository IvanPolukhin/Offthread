import { StrictMode } from 'react';
import { AppProvidersProps } from 'src/features/AppProviders/types';
import ThemeProvider from 'src/contexts/ThemeContext';

const AppProviders = ({ children }: AppProvidersProps) => {
  return <StrictMode><ThemeProvider>{children}</ThemeProvider></StrictMode>;
};

export default AppProviders;
