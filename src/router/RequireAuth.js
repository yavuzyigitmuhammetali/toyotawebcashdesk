import React from 'react';
import AppStatusContext from "../shared/states/AppStatus/context";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import OfflineErrorPage from "../pages/OfflineErrorPage";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import setupAxiosInterceptors from '../shared/functions/setupAxiosInterceptors';
import config from "../config";
import {setFavicon} from "../utils/faviconUtils";
import {useTranslation} from "react-i18next";

export default function RequireAuth() {
    const {isLoggedIn, isOnline, dark, logOut, setIsOnline, setStatus} = React.useContext(AppStatusContext);
    const navigate = useNavigate();
    const location = useLocation();
    const {t} = useTranslation();

    React.useEffect(() => {
        if (isOnline && location.pathname === '/login' && isLoggedIn) {
            navigate('/', {replace: true, state: {errorMessage: t('alreadyLoggedIn')}});
        }
    }, [location, navigate, isLoggedIn, isOnline, t]);

    setupAxiosInterceptors(logOut, setIsOnline, setStatus);


    React.useEffect(() => {
        setFavicon(config.storeLogo.favicon);
    }, []);


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