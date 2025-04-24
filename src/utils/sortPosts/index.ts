import { Post } from 'src/types';

export const sortPosts = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => {
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;

    return (a.id || 0) - (b.id || 0);
  });
};
