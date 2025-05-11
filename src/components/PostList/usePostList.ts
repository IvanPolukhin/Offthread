import { useStore } from 'src/store';
import { useEffect } from 'react';

export const usePostList = () => {
  const { posts, isLoading, error } = useStore();
  const fetchNextPage = useStore((s) => s.fetchNextPage);

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return { posts, isLoading, error, fetchNextPage };
};
