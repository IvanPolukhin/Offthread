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
        className="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded border p-2"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border-input bg-background text-foreground placeholder:text-muted-foreground w-full rounded border p-2"
        required
      />
      <button
        type="submit"
        disabled={!title || !content}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-4 py-2"
      >
        Add Post
      </button>
    </form>
  );
};

export default AddPost;
