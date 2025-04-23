import { Post } from 'src/types';

export type PostSlice = {
  posts: Post[];
  page: number;
  isLoading: boolean;
  fetchNextPage: () => void;
};
