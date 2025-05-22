import { StrictMode } from 'react';
import { AppProvidersProps } from 'src/features/AppProviders/types';
import ThemeProvider from 'src/contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <StrictMode>
      <ThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );
};

export default AppProviders;
