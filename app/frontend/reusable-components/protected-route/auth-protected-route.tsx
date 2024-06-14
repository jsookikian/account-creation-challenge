import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsLoggedIn } from 'app/frontend/hooks/useIsLoggedIn';
import Spinner from '../spinner/spinner';

interface AuthProtectedRouteProps {
  element: React.ReactElement;
}

const AuthProtectedRoute: React.FC<AuthProtectedRouteProps> = ({ element }) => {
  const { isLoggedIn, loading } = useIsLoggedIn();

  if (loading) {
    return <Spinner />;
  }

  return isLoggedIn ? element : <Navigate to="/create-account" />;
};

export default AuthProtectedRoute;
