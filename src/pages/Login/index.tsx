import { useLogin } from 'src/pages/Login/useLogin.ts';
import { Button } from 'src/components/ui/button.tsx';
import { Input } from 'src/components/ui/input.tsx';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleEmailLogin,
    loginWithGoogle,
    isLoggingIn,
    error,
  } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="bg-card w-full max-w-md space-y-4 rounded-xl border p-8 shadow-xl">
        <h2 className="text-xl font-bold">Login / Registration</h2>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoggingIn}>
            Sign in with Email
          </Button>
        </form>

        <div className="text-muted-foreground text-center text-sm">or</div>

        <Button
          onClick={loginWithGoogle}
          className="w-full"
          disabled={isLoggingIn}
        >
          Sign in with Google
        </Button>

        {error && (
          <p className="text-center text-sm text-red-500">{error.message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
