import React from 'react';
import StatusContext from "./context";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";

export default function RequireAuth() {
    const {loggedIn} = React.useContext(StatusContext);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (location.pathname === '/login' && loggedIn) {
            navigate('/', {replace: true, state: {errorMessage: 'Zaten giriş yapıldı'}});
        }
    }, [location, navigate]);


    return (
        <>
            {!loggedIn?<Navigate to="/login"/>:<></>}
            <Outlet/>
        </>

    )

}