import { Navigate, useLocation } from 'react-router-dom';
import { RequireAuthProps } from 'src/features/RequireAuth/types.ts';
import { useAuth } from 'src/hooks/useAuth';
import { RoutePaths } from 'src/types';

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={RoutePaths.LOGIN} state={{ from: location }} replace />;
}

  return <>{children}</>;
};
