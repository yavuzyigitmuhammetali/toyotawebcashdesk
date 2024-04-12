import React from 'react';
import AppStatusContext from "../shared/state/AppStatus/context";
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom";
import OfflineErrorPage from "../pages/OfflineErrorPage";
import {createTheme, ThemeProvider} from "@mui/material/styles";

export default function RequireAuth() {
    const {isLoggedIn, isOnline, dark} = React.useContext(AppStatusContext);
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
            <ThemeProvider theme={createTheme({palette: {mode: dark ? "dark" : "light"}})}>
                {!isLoggedIn && isOnline && location.pathname !== '/login' ? <Navigate to="/login"/> : <></>}
                <Outlet/>
            </ThemeProvider>

        )
    }


}