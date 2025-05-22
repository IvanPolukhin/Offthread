import { useSyncOnOnline } from 'src/hooks/useSyncOnOnline';
import { ThemeSwitch } from 'src/features/ThemeToggle';
import PostList from 'src/components/PostList';
import AddPost from 'src/features/AddPost';

const Posts = () => {
  useSyncOnOnline();

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Offthread</h1>
        <ThemeSwitch />
      </div>
      <PostList />
      <AddPost />
    </>
  );
};

export default Posts;
