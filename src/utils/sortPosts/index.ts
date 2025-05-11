import { Post } from 'src/types';

export const sortPosts = (posts: Post[]): Post[] => {
  return [...posts].sort((a, b) => {
    const getPriority = (status: Post['status']) => {
      switch (status) {
        case 'pending':
          return 0;
        case 'offline':
          return 1;
        case 'synced':
          return 2;
        default:
          return 2;
      }
    };

    const priorityA = getPriority(a.status);
    const priorityB = getPriority(b.status);

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();

    return bDate - aDate;
  });
};
