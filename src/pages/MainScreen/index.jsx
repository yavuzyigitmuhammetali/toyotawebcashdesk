import React, {useCallback, useEffect, useState} from 'react';
import "./mainScreen.css"
import OnlineOfflineIndicator from "../../shared/components/OnlineOfflineIndicator";
import {getIp} from "./api";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from "@mui/material";
import MainScreenItem from "./components/MainScreenItem";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AlertComponent from "../../shared/components/AlertComponent";
import {useLocation, useNavigate} from "react-router-dom";
import StatusContext from "../../shared/state/context";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});


function MainScreen({dark = false}) {
    const [userIP, setUserIP] = useState('');
    const {online,status} = React.useContext(StatusContext);

    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState(location.state?.errorMessage || location.state?.successMessage);
    const [severity, setSeverity] = useState(location.state?.successMessage ? 'success' : 'error');

    useEffect(() => {
        if (location.state?.errorMessage || location.state?.successMessage) {
            setMessage(location.state?.errorMessage || location.state?.successMessage);
            setSeverity(location.state?.successMessage ? 'success' : 'error');
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [navigate, location]);


    useEffect(() => {
        getIp()
            .then(response => {
                setUserIP(response.data.ip);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    const logOut = useCallback(() => {
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/api/v1;";
        window.location.reload();
    }, []);
    return (
        <>
            <ThemeProvider theme={dark?darkTheme:lightTheme}>
                <AlertComponent message={message} severity={severity} open={Boolean(message)}/>
                <div style={{backgroundColor:dark?"#111418":"#F8FAFB"}} className="main-screen-container">
                    <div className="main-screen-active-area">
                        <div className="main-screen-sides">
                            <MainScreenItem to={"/order/create"} dark={dark} customIcon={LogoutIcon}>Sipariş Oluşturma</MainScreenItem>
                            <MainScreenItem to={"/products/list"} dark={dark}>Ürünler</MainScreenItem>
                            <MainScreenItem to={"/product/add"} dark={dark}>Ürün Girişi</MainScreenItem>
                        </div>
                        <div className="main-screen-sides">
                            <MainScreenItem to={"/refund/create"} dark={dark}>İade İşlemleri</MainScreenItem>
                            <MainScreenItem to={"/purchase/list"} dark={dark}>Makbuzlar</MainScreenItem>
                            <MainScreenItem dark={dark}>Raporlar</MainScreenItem>
                        </div>
                    </div>
                </div>
                <div className="main-screen-lower-left">
                    <OnlineOfflineIndicator online={online}/>
                </div>
                <div style={{backgroundColor:dark?"#1E1E1E":"white",color:dark?"white":"black",borderColor:dark?"white":"black"}} className="main-screen-upper-left">
                    <div>Mağaza No: {status.storeNumber}</div>
                    <div>Kasa No: {status.case} (KASA {status.case})</div>
                    <div>İp No: {userIP}</div>
                    <div>Versiyon: {status.version}</div>
                </div>
                <div className="main-screen-upper-right">
                    <IconButton color="info" aria-label="delete">
                        <SettingsIcon/>
                    </IconButton>
                </div>
                <div className="main-screen-lower-right">
                    <IconButton onClick={logOut} color="error" aria-label="delete">
                        <LogoutIcon/>
                    </IconButton>
                </div>
            </ThemeProvider>
        </>

    );
}

export default MainScreen;