import React from 'react';
import { Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';


// this module is not working properly, it should implement protected routes but cannot access state!!!

const UserRoute = ({ children }) => { 
    const  {user}  = useSelector((state) => ({...state}));
 console.log(user);
   // return user && user.token ? children : <Navigate to="/login"/>;

    return   true ? children : <Navigate to="/login"/>;


}

export default UserRoute;
