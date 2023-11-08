import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/Authprovider';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/signin" />;
}

export default PrivateRoute;