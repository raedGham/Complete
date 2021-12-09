import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { currentAdmin } from "../../functions/auth";
import LoadingToRedirect from './LoadingToRedirect';


const AdminRoute = ({ children }) => {

    const { user } = useSelector((state) => ({ ...state }));


    const [ok, setOk] = useState(false);
    console.log("Admin Route user", user);
    useEffect(() => {

        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    console.log("Current ADMIN response", res)
                    setOk(true);
                })
                .catch((err) => {
                    console.log(" ADMIN route error", err);
                    setOk(false);

                })

        }

    }, [user]);


    return ok ? children : <LoadingToRedirect />;
    //<Navigate to="/login"/>

}

export default AdminRoute;
