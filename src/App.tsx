import { useSyncOnOnline } from 'src/hooks/useSyncOnOnline';
import PostList from 'src/components/PostList';
import AddPost from 'src/features/AddPost';
// import { useEffect } from 'react';
// import { db } from 'src/db';

function App() {
  useSyncOnOnline();

  // useEffect(() => {
  //   const resetDB = async () => {
  //     if (import.meta.env.DEV) {
  //       console.log('[DEV] Resetting IndexedDB...');
  //       await db.delete();
  //       await db.open();
  //     }
  //   };
  //
  //   resetDB().catch(console.error);
  // }, []);

  return (
    <main className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white">
      <h1 className="p-4 text-2xl font-bold">Offthread</h1>
      <PostList />
      <AddPost />
    </main>
  );
}

export default App;
