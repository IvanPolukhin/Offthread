import { Post } from 'src/types';

export type PostSlice = {
  posts: Post[];
  addPost: (post: Post) => Promise<void>;
  page: number;
  isLoading: boolean;
  error: string | null;
  fetchNextPage: () => Promise<void>;
};
