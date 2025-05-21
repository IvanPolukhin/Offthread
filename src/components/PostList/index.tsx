import { usePostList } from 'src/components/PostList/usePostList.ts';

const PostList = () => {
  const { posts, isLoading, error, fetchNextPage } = usePostList();

  return (
    <div className="space-y-4 p-4">
      {error && <div className="text-destructive">{error}</div>}
      {posts.map((post) => (
        <div
          key={post.serverId}
          className="rounded-xl bg-card text-card-foreground p-4"
        >
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleString()}
          </p>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
      <button
        onClick={fetchNextPage}
        disabled={isLoading}
        className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        {isLoading ? 'Loading...' : 'Load more'}
      </button>
    </div>
  );
};

export default PostList;
