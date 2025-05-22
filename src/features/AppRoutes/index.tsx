import { Routes, Route, Navigate } from 'react-router-dom';
import { RoutePaths } from 'src/types';
import { RequireAuth } from 'src/features/RequireAuth';
import Login from 'src/pages/Login';
import Posts from 'src/pages/Posts';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={RoutePaths.POSTS} replace />} />
      <Route path={RoutePaths.LOGIN} element={<Login />} />

      <Route
        path={RoutePaths.POSTS}
        element={
          <RequireAuth>
            <Posts />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRouter;
