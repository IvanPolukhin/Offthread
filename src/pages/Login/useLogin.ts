import * as React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from 'src/api';
import { RoutePaths } from 'src/types';

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithGoogle = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Logged in user:', result.user);
      navigate(RoutePaths.POSTS);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const loginWithEmailAndPassword = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', result.user);
      navigate(RoutePaths.POSTS);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginWithEmailAndPassword();
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleEmailLogin,
    loginWithGoogle,
    isLoggingIn,
    error,
  };
};
