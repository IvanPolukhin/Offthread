import { useEffect } from 'react';
import { useStore } from 'src/store';

const PostList = () => {
  const { posts, isLoading, error } = useStore();
  const fetchNextPage = useStore((s) => s.fetchNextPage);

  useEffect(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    <div className="space-y-4 p-4">
      {error && <div className="text-red-500">{error}</div>}
      {!isLoading && posts.length === 0 && (
        <div className="text-center text-gray-400">No posts yet.</div>
      )}
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-xl bg-gray-100 p-4 dark:bg-zinc-800"
        >
          {post.content}
        </div>
      ))}
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <button
          onClick={fetchNextPage}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default PostList;
