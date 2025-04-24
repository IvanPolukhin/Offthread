import { db } from 'src/db';

export const seedPosts = async () => {
  const count = await db.posts.count();
  if (count === 0) {
    await db.posts.bulkAdd(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i + 1,
        title: `Post title #${i + 1}`,
        content: `Post content #${i + 1}`,
        date: new Date().toISOString(),
        status: 'offline'
      })),
    );
  }
};
