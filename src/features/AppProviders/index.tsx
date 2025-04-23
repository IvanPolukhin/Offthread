import { StrictMode } from 'react';
import { AppProvidersProps } from 'src/features/AppProviders/types';

const AppProviders = ({ children }: AppProvidersProps) => {
  return <StrictMode>{children}</StrictMode>;
};

export default AppProviders;
