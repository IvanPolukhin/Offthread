import PostList from 'src/components/PostList';

function App() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white">
      <h1 className="p-4 text-2xl font-bold">Offthread</h1>
      <PostList />
    </main>
  );
}

export default App;
