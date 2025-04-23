import { create } from 'zustand';
import { createPostSlice } from 'src/store/slices/createPostSlice';
import { StoreState } from 'src/store/types.ts';

export const useStore = create<StoreState>()((...args) => ({
  ...createPostSlice(...args),
}));
