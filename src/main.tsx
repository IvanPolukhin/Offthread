import { createRoot } from 'react-dom/client';
import 'src/index.css';
import App from 'src/App.tsx';
import AppProviders from 'src/features/AppProviders';
import { seedPosts } from 'src/utils/seedPosts';

seedPosts();

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>,
);
