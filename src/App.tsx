import { useSyncOnOnline } from 'src/hooks/useSyncOnOnline';
import PostList from 'src/components/PostList';
import AddPost from 'src/features/AddPost';
import { ThemeSwitch } from 'src/features/ThemeToggle';

function App() {
  useSyncOnOnline();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Offthread</h1>
        <ThemeSwitch />
      </div>
      <PostList />
      <AddPost />
    </main>
  );
}

export default App;
