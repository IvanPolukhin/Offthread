import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from 'src/api';
import { RoutePaths } from 'src/types';

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Logged in user:', result.user);
      navigate(RoutePaths.POSTS);
    } catch (err) {
      console.error('Login failed:', err);
      setError(err as Error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return { login, isLoggingIn, error };
};
