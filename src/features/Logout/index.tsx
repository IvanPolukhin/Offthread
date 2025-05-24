import { Button } from 'src/components/ui/button.tsx';
import { useLogout } from './useLogout';

export const LogoutButton = () => {
  const { logout, isLoggingOut, error } = useLogout();

  return (
    <div>
      <Button onClick={logout} disabled={isLoggingOut}>
        {isLoggingOut ? 'Logout...' : 'Log out of account'}
      </Button>
      {error && (
        <p className="mt-2 text-red-500">Output error: {error.message}</p>
      )}
    </div>
  );
};
