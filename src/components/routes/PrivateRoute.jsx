import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserStore from '@store/UserStore';

const PrivateRoute = ({ children, ...rest }) => {
  const { user, permissions } = UserStore();

  if (!user) return <Navigate to="/login" replace={true} />;

  // 승인 구분 (A:신청완료, B:승인, C:거절)

  const permission = permissions;
  if (permission === 'B') return children;
  else return <Navigate to="/login/JoinEnd" replace={true} state={{ memberApprovalSe: permission }} />;

  // return user ? children : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
