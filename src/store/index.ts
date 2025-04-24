import { create } from 'zustand';
import { createPostSlice } from 'src/store/slices/createPostSlice';
import { StoreState } from 'src/store/types.ts';
import { createSyncSlice } from 'src/store/slices/createSyncSlice';

export const useStore = create<StoreState>()((...args) => ({
  ...createPostSlice(...args),
  ...createSyncSlice(...args)
}));
