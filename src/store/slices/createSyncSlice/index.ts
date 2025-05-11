import { StateCreator } from 'zustand/vanilla';
import { StoreState } from 'src/store/types.ts';
import { SyncSlice } from 'src/store/slices/createSyncSlice/types.ts';
import { db } from 'src/db';
import { sortPosts } from 'src/utils/sortPosts';
import { Timestamp, collection, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from 'src/api/index.ts';
import { Post } from 'src/types';

export const createSyncSlice: StateCreator<StoreState, [], [], SyncSlice> = (
  set,
) => ({
  isSyncing: false,

  syncChanges: async () => {
    set({ isSyncing: true });

    try {
      const localChanges = await db.localChanges.toArray();

      for (const change of localChanges) {
        if (change.type === 'create') {
          const localPost = change.payload as Post;

          try {
            const docRef = await addDoc(collection(firestore, 'posts'), {
              title: localPost.title,
              content: localPost.content,
              date: localPost.date,
              status: 'synced',
            });

            await db.posts.put({
              serverId: docRef.id,
              title: localPost.title,
              content: localPost.content,
              date: localPost.date,
              status: 'synced',
            });

            if (localPost.serverId) {
              await db.posts.delete(localPost.serverId);
            }
          } catch (error) {
            console.error('Failed to upload post to Firestore:', error);
          }
        }
      }

      await db.localChanges.clear();

      const querySnapshot = await getDocs(collection(firestore, 'posts'));
      const postsFromServer: Post[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          serverId: doc.id,
          title: data.title,
          content: data.content,
          date:
            data.date instanceof Timestamp
              ? data.date.toDate().toISOString()
              : data.date,
          status: data.status ?? 'synced',
        };
      });

      await db.posts.clear();
      for (const post of postsFromServer) {
        await db.posts.add(post);
      }

      const updatedPosts = await db.posts.toArray();
      const sortedPosts = sortPosts(updatedPosts);
      set({ posts: sortedPosts, page: 1 });
    } catch (e) {
      console.error('Error syncing changes:', e);
    } finally {
      set({ isSyncing: false });
    }
  },
});
