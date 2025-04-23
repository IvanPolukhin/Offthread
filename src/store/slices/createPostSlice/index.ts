import { StateCreator } from 'zustand/vanilla';
import { PostSlice } from 'src/store/slices/createPostSlice/types.ts';
import { StoreState } from 'src/store/types.ts';
import { Post } from 'src/types';

export const createPostSlice: StateCreator<StoreState, [], [], PostSlice> = (
  set,
  get,
) => ({
  posts: [],
  page: 1,
  isLoading: false,
  fetchNextPage: async () => {
    const { page, posts } = get();
    set({ isLoading: true });
    const res = await fetch(`/api/posts?page=${page + 1}`);
    const newPosts: Post[] = await res.json();
    set({
      posts: [...posts, ...newPosts],
      page: page + 1,
      isLoading: false,
    });
  },
});
