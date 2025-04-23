import { StateCreator } from 'zustand/vanilla';
import { PostSlice } from './types';
import { StoreState } from 'src/store/types';
import { db } from 'src/db';

export const createPostSlice: StateCreator<StoreState, [], [], PostSlice> = (
  set,
  get,
) => ({
  posts: [],
  page: 1,
  isLoading: false,
  error: null,
  fetchNextPage: async () => {
    const { posts, page } = get();
    set({ isLoading: true, error: null });

    try {
      const newPosts = await db.posts
        .orderBy('id')
        .offset(posts.length)
        .limit(10)
        .toArray();

      set({
        posts: [...posts, ...newPosts],
        page: page + 1,
        isLoading: false,
      });
    } catch (e) {
      console.error('Error fetching posts:', e);
      set({ isLoading: false, error: 'Failed to load posts from DB' });
    }
  },
});
