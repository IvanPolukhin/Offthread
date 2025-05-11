import { useStore } from 'src/store';
import { useEffect } from 'react';

export const useSyncOnOnline = () => {
  const syncChanges = useStore((s) => s.syncChanges);

  useEffect(() => {
    const handleOnline = () => {
      console.log('Online - start synchronization...');
      syncChanges().catch(console.error);
    };

    if (navigator.onLine) handleOnline();

    window.addEventListener('online', handleOnline);

    return () => window.removeEventListener('online', handleOnline);
  }, [syncChanges]);
};
