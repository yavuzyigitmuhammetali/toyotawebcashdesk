import React from 'react';
import AppStatusContext from "../shared/states/AppStatus/context";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import OfflineErrorPage from "../pages/OfflineErrorPage";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import setupAxiosInterceptors from '../shared/functions/setupAxiosInterceptors';

export default function RequireAuth() {
    const {isLoggedIn, isOnline, dark, logOut, setIsOnline, setStatus} = React.useContext(AppStatusContext);
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if (isOnline && location.pathname === '/login' && isLoggedIn) {
            navigate('/', {replace: true, state: {errorMessage: 'Zaten giriş yapıldı'}});
        }
    }, [location, navigate, isLoggedIn, isOnline]);

    setupAxiosInterceptors(logOut, setIsOnline, setStatus);


    if (!isOnline) {
        return (<OfflineErrorPage/>)
    } else {
        return (
            <ThemeProvider theme={createTheme({palette: {mode: dark ? "dark" : "light"}, typography: {fontSize: 10}})}>
                {!isLoggedIn && isOnline && location.pathname !== '/login' ? <Navigate to="/login"/> : <></>}
                <Outlet/>
            </ThemeProvider>

        )
    }


}