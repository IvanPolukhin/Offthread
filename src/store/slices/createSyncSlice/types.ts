export type SyncSlice = {
  isSyncing: boolean;
  syncChanges: () => Promise<void>;
};
