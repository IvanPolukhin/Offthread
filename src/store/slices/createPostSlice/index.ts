import { StateCreator } from 'zustand/vanilla';
import { StoreState } from 'src/store/types';
import { PostSlice } from 'src/store/slices/createPostSlice/types.ts';
import { db } from 'src/db';
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
    const { posts, page } = get();
    set({ isLoading: true, error: null });

    try {
      const newPosts = await db.posts
        .orderBy('id')
        .offset(posts.length)
        .limit(10)
        .toArray();

      const sortedPosts = [
        ...newPosts.filter((post) => post.status === 'pending'),
        ...newPosts.filter((post) => post.status !== 'pending'),
      ]

      set({
        posts: [...posts, ...sortedPosts],
        page: page + 1,
        isLoading: false,
      });
    } catch (e) {
      console.error('Error fetching posts:', e);
      set({ isLoading: false, error: 'Failed to load posts from DB' });
    }
  },
  addPost: async (newPost: Post) => {
    const { posts } = get();
    set({ isLoading: true, error: null });

    try {
      const completePost: Post = {
        ...newPost,
        status: newPost.status || 'pending',
      };

      const id = await db.posts.add(completePost);

      const savedPost: Post = { ...completePost, id };
      set({
        posts: [savedPost, ...posts],
      });

      await db.localChanges.add({
        type: 'create',
        entity: 'post',
        payload: savedPost,
      });
    } catch (e) {
      console.error('Error adding post:', e);
      set({ isLoading: false, error: 'Failed to add post' });
    } finally {
      set({ isLoading: false });
    }
  },
});
