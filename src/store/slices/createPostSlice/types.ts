import { Post } from 'src/types';

export type PostSlice = {
  posts: Post[];
  page: number;
  isLoading: boolean;
  error: string | null;
  fetchNextPage: () => void;
};
