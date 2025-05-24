import { usePostList } from 'src/components/PostList/usePostList.ts';

const PostList = () => {
  const { posts, isLoading, error, fetchNextPage } = usePostList();

  return (
    <div className="space-y-4 p-4">
      {error && <div className="text-destructive">{error}</div>}
      {posts.map((post) => (
        <div
          key={post.serverId}
          className="bg-card text-card-foreground rounded-xl p-4"
        >
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-muted-foreground text-sm">
            {new Date(post.date).toLocaleString()}
          </p>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
      <button
        onClick={fetchNextPage}
        disabled={isLoading}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-4 py-2"
      >
        {isLoading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
};

export default PostList;
