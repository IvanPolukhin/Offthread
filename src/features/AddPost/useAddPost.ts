import * as React from 'react';
import { useStore } from 'src/store';
import { useState } from 'react';
import { Post } from 'src/types';

export const useAddPost = () => {
  const addPost = useStore((s) => s.addPost);
  const syncChanges = useStore((s) => s.syncChanges);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: Post = {
      serverId: `local-${Date.now()}`,
      title,
      content,
      date: new Date().toISOString(),
      status: 'pending',
    };

    await addPost(newPost);

    if (navigator.onLine) {
      await syncChanges();
    } else {
      console.log('The post has been saved offline');
    }

    setTitle('');
    setContent('');
  };

  return {
    title,
    content,
    handleSubmit,
    setTitle,
    setContent,
  };
};
