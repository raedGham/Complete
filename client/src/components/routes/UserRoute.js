import React from 'react';

import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

// this module is not working properly, it should implement protected routes but cannot access state!!!

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  return user && user.token ? children : <LoadingToRedirect />;


}

export default UserRoute;
