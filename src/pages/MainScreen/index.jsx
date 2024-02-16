import React, {useEffect, useState} from 'react';
import "./mainScreen.css"
import OnlineOfflineIndicator from "../../shared/components/OnlineOfflineIndicator";
import {getIp, getStatus} from "./api";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from "@mui/material";
import MainScreenItem from "./components/MainScreenItem";
import {createTheme, ThemeProvider} from "@mui/material/styles";

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
    const [status, setStatus] = useState({})


    useEffect(() => {
        getIp()
            .then(response => {
                setUserIP(response.data.ip);
            })
            .catch(error => {
                console.error(error);
            });
        getStatus()
            .then(response => {
                setStatus(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <ThemeProvider theme={dark?darkTheme:lightTheme}>
                <div style={{backgroundColor:dark?"#111418":"#F8FAFB"}} className="main-screen-container">
                    <div className="main-screen-active-area">
                        <div className="main-screen-sides">
                            <MainScreenItem to={"/order/create"} dark={dark} customIcon={LogoutIcon}>Sipariş Oluşturma</MainScreenItem>
                            <MainScreenItem dark={dark}>DENEME</MainScreenItem>
                            <MainScreenItem dark={dark}>DENEME</MainScreenItem>
                        </div>
                        <div className="main-screen-sides">
                            <MainScreenItem to={"/refund/create"} dark={dark}>İade İşlemleri</MainScreenItem>
                            <MainScreenItem to={"/purchase/list"} dark={dark}>Makbuzlar</MainScreenItem>
                            <MainScreenItem dark={dark}>DENEME</MainScreenItem>
                        </div>
                    </div>
                </div>
                <div className="main-screen-lower-left">
                    <OnlineOfflineIndicator/>
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
                    <IconButton color="error" aria-label="delete">
                        <LogoutIcon/>
                    </IconButton>
                </div>
            </ThemeProvider>
        </>

    );
}

export default MainScreen;