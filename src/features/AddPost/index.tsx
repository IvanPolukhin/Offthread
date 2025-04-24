import * as React from 'react';
import { useState } from 'react';
import { useStore } from 'src/store';
import { Post } from 'src/types';

const AddPost = () => {
  const addPost = useStore((s) => s.addPost);
  const syncChanges = useStore((s) => s.syncChanges);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: Post = {
      title,
      content,
      date: new Date().toISOString(),
      status: 'pending',
    };

    await addPost(newPost);

    if (navigator.onLine) {
      await syncChanges();
    } else {
      console.log('The post has been saved offline ');
    }

    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-2"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded border p-2"
        required
      />
      <button
        type="submit"
        disabled={!title || !content}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Add Post
      </button>
    </form>
  );
};

export default AddPost;
