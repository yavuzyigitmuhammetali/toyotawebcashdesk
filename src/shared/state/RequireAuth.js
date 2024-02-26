import React from 'react';
import DataFetchingContext from "./context";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import OfflineErrorPage from "../../pages/OfflineErrorPage";

export default function RequireAuth() {
    const {loggedIn, online} = React.useContext(DataFetchingContext);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (online && location.pathname === '/login' && loggedIn) {
            navigate('/', {replace: true, state: {errorMessage: 'Zaten giriş yapıldı'}});
        }
    }, [location, navigate, loggedIn]);

    if (!online) {
        return (<OfflineErrorPage/>)
    } else {
        return (
            <>
                {!loggedIn && online && location.pathname !== '/login' ? <Navigate to="/login"/> : <></>}
                <Outlet/>
            </>

        )
    }


}