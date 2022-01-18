import React, { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from "../../pages/auth/auth.context";

const PrivateRoute = props => {
    const auth = useContext(AuthContext);
    const { path, element } = props;

    return auth.userIsLogged ? <Outlet /> : <Navigate to="/authenticate" />
}

export default PrivateRoute;