import { useAddPost } from 'src/features/AddPost/useAddPost.ts';

const AddPost = () => {
  const { title, content, handleSubmit, setTitle, setContent } = useAddPost();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border border-input bg-background p-2 text-foreground placeholder:text-muted-foreground"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded border border-input bg-background p-2 text-foreground placeholder:text-muted-foreground"
        required
      />
      <button
        type="submit"
        disabled={!title || !content}
        className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
      >
        Add Post
      </button>
    </form>
  );
};

export default AddPost;
