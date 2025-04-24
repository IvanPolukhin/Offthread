import { PostSlice } from 'src/store/slices/createPostSlice/types';
import { SyncSlice } from 'src/store/slices/createSyncSlice/types.ts';

export type StoreState = PostSlice & SyncSlice;
