import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/selectors';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const shouldRedirect = !isLoggedIn; 

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
