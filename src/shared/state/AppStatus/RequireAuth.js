import React from 'react';
import AppStatusContext from "./context";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import OfflineErrorPage from "../../../pages/OfflineErrorPage";

export default function RequireAuth() {
    const {isLoggedIn, isOnline} = React.useContext(AppStatusContext);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (isOnline && location.pathname === '/login' && isLoggedIn) {
            navigate('/', {replace: true, state: {errorMessage: 'Zaten giriş yapıldı'}});
        }
    }, [location, navigate, isLoggedIn]);


    if (!isOnline) {
        return (<OfflineErrorPage/>)
    } else {
        return (
            <>
                {!isLoggedIn && isOnline && location.pathname !== '/login' ? <Navigate to="/login"/> : <></>}
                <Outlet/>
            </>

        )
    }


}