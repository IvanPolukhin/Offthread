import { useSyncOnOnline } from 'src/hooks/useSyncOnOnline';
import PostList from 'src/components/PostList';
import AddPost from 'src/features/AddPost';
import { useEffect } from 'react';

function App() {
  useSyncOnOnline();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <h1 className="p-4 text-2xl font-bold">Offthread</h1>
      <PostList />
      <AddPost />
    </main>
  );
}

export default App;
