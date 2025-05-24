import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from 'src/api';

export const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const logout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setError(null);

    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout failed:', err);
      setError(err as Error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut, error };
};
