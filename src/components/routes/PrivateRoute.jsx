import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/Authprovider';

export function PrivateRoute({ element }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/signin" />;
}
