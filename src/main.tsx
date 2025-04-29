import { createRoot } from 'react-dom/client';
import 'src/index.css';
import App from 'src/App.tsx';
import AppProviders from 'src/features/AppProviders';

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
