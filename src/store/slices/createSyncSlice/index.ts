import { StateCreator } from 'zustand/vanilla';
import { StoreState } from 'src/store/types.ts';
import { SyncSlice } from 'src/store/slices/createSyncSlice/types.ts';
import { db } from 'src/db';
import { sortPosts } from 'src/utils/sortPosts';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from 'src/api/index.ts';

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

          try {
            const docRef = await addDoc(collection(firestore, 'posts'), {
              title: post.title,
              content: post.content,
              date: post.date,
            });

            console.log('Post added with ID:', docRef.id);

            await db.posts.update(post.id!, {
              status: 'synced',
              serverId: docRef.id,
            });
          } catch (error) {
            console.error('Failed to upload post to Firestore:', error);
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
