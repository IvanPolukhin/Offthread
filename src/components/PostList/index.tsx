import { usePostList } from 'src/components/PostList/usePostList.ts';

const PostList = () => {
  const { posts, isLoading, error, fetchNextPage } = usePostList();

  return (
    <div className="space-y-4 p-4">
      {error && <div className="text-red-500">{error}</div>}
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-xl bg-gray-100 p-4 dark:bg-zinc-800"
        >
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-500">
            {new Date(post.date).toLocaleString()}
          </p>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
      <button
        onClick={fetchNextPage}
        disabled={isLoading}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {isLoading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
};

export default PostList;
