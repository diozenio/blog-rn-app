import React, {useMemo} from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {useAuth} from '../contexts/AuthContext';

const Routes = () => {
  const {isSigned} = useAuth();

  const ActiveRoutes = useMemo(() => {
    if (isSigned) {
      return AppRoutes;
    }
    return AuthRoutes;
  }, [isSigned]);

  return <ActiveRoutes />;
};

export default Routes;
