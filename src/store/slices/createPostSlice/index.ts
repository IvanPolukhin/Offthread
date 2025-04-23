import { StateCreator } from 'zustand/vanilla';
import { PostSlice } from './types';
import { StoreState } from 'src/store/types';
import { Post } from 'src/types';

export const createPostSlice: StateCreator<StoreState, [], [], PostSlice> = (
  set,
  get,
) => ({
  posts: [],
  page: 1,
  isLoading: false,
  error: null,
  fetchNextPage: async () => {
    const { page, posts } = get();
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`/api/posts?page=${page + 1}`);
      const newPosts: Post[] = await res.json();
      set({
        posts: [...posts, ...newPosts],
        page: page + 1,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      set({ isLoading: false, error: 'Failed to load posts' });
    }
  },
});
