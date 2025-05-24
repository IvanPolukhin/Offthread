import { useLogin } from 'src/pages/Login/useLogin.ts';
import { Button } from 'src/components/ui/button.tsx';

const Login = () => {
const {login, isLoggingIn, error} = useLogin()

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-card w-full max-w-md space-y-4 rounded-xl border p-8 shadow-xl">
        <h2 className="text-xl font-bold">Login / Registration</h2>
        <Button onClick={login} className="w-full" disabled={isLoggingIn}>
          {isLoggingIn ? 'Signing in...' : 'Sign in with Google'}
        </Button>
        {error && (
          <p className="text-sm text-red-500 mt-2">
            Login error: {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
