import { StateCreator } from 'zustand/vanilla';
import { StoreState } from 'src/store/types.ts';
import { SyncSlice } from 'src/store/slices/createSyncSlice/types.ts';
import { db } from 'src/db';
import { sortPosts } from 'src/utils/sortPosts';

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

        if (change.type === 'create') {
          const post = change.payload;

          if (!post.id) {
            post.id = new Date().getTime();
          }

          const existingPost = await db.posts.get(post.id);
          if (!existingPost) {
            await db.posts.add(post);
          }
        }
      }

      const updatedPosts = await db.posts.toArray();
      const sortedPosts = sortPosts(updatedPosts);

      set({ posts: sortedPosts });

      await db.localChanges.clear();
    } catch (e) {
      console.error('Error syncing changes:', e);
    } finally {
      set({ isSyncing: false });
    }
  },
});
