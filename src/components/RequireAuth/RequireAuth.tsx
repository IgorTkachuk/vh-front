import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks';

const RequireAuth: FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();

  return token !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
