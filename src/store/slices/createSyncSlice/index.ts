import { StateCreator } from 'zustand/vanilla';
import { StoreState } from 'src/store/types.ts';
import { SyncSlice } from 'src/store/slices/createSyncSlice/types.ts';
import { db } from 'src/db';

export const createSyncSlice: StateCreator<StoreState, [], [], SyncSlice> = (
  set,
) => ({
  isSyncing: false,
  syncChanges: async () => {
    set({ isSyncing: true });

    try {
      const localChanges = await db.localChanges.toArray();

      for (const change of localChanges) {
        console.log('Synchronization of action', change);
      }

      await db.localChanges.clear();
    } catch (e) {
      console.error('Error syncing changes:', e);
    } finally {
      set({ isSyncing: false });
    }
  },
});
