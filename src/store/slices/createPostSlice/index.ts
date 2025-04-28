import { StateCreator } from 'zustand/vanilla';
import { StoreState } from 'src/store/types';
import { PostSlice } from 'src/store/slices/createPostSlice/types.ts';
import { db } from 'src/db';
import { Post } from 'src/types';
import { sortPosts } from 'src/utils/sortPosts';

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

      const uniqueNewPosts = newPosts.filter(
        (newPost) => !posts.some((post) => post.id === newPost.id),
      );

      const mergedPosts = [...uniqueNewPosts, ...posts];
      const sortedPosts = sortPosts(mergedPosts);

      set({
        posts: sortedPosts,
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

      const newPosts = [savedPost, ...posts];
      const sortedPosts = sortPosts(newPosts);

      set({
        posts: sortedPosts,
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
