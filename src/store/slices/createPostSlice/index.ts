import { StateCreator } from 'zustand/vanilla';
import { StoreState } from 'src/store/types';
import { db } from 'src/db';
import { Post } from 'src/types';
import { sortPosts } from 'src/utils/sortPosts';
import { PostSlice } from 'src/store/slices/createPostSlice/types.ts';

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
        .orderBy('date')
        .reverse()
        .offset(posts.length)
        .limit(10)
        .toArray();

      const uniqueNewPosts = newPosts.filter(
        (newPost) => !posts.some((post) => post.serverId === newPost.serverId),
      );

      const mergedPosts = [...posts, ...uniqueNewPosts];
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
        serverId: newPost.serverId || crypto.randomUUID(),
        status: newPost.status || 'pending',
      };

      await db.posts.put(completePost);

      const newPosts = [completePost, ...posts];
      const sortedPosts = sortPosts(newPosts);

      set({
        posts: sortedPosts,
      });

      await db.localChanges.add({
        type: 'create',
        entity: 'post',
        payload: completePost,
      });
    } catch (e) {
      console.error('Error adding post:', e);
      set({ isLoading: false, error: 'Failed to add post' });
    } finally {
      set({ isLoading: false });
    }
  },
});
