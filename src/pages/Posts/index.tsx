import { useSyncOnOnline } from 'src/hooks/useSyncOnOnline';
import { ThemeSwitch } from 'src/features/ThemeToggle';
import { LogoutButton } from 'src/features/Logout';
import AddPost from 'src/features/AddPost';
import PostList from 'src/components/PostList';

const Posts = () => {
  useSyncOnOnline();

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Offthread</h1>
        <div className="flex space-x-2">
          <LogoutButton />
          <ThemeSwitch />
        </div>
      </div>
      <PostList />
      <AddPost />
    </>
  );
};

export default Posts;
