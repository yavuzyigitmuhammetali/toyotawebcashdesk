import React from 'react';
import "./mainScreen.css"
import OnlineOfflineIndicator from "../../shared/components/OnlineOfflineIndicator";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from "@mui/material";
import MainScreenItem from "./components/MainScreenItem";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AlertComponent from "../../shared/components/AlertComponent";
import AppStatusContext from "../../shared/state/AppStatus/context";

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
    const {isOnline, status, logOut} = React.useContext(AppStatusContext);
    return (<>
            <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                <AlertComponent/>
                <div style={{backgroundColor: dark ? "#111418" : "#F8FAFB"}} className="main-screen-container">
                    <div className="main-screen-active-area">
                        <div className="main-screen-sides">
                            <MainScreenItem to={"/order/create"} dark={dark} customIcon={LogoutIcon}>Sipariş
                                Oluşturma</MainScreenItem>
                            <MainScreenItem to={"/products/list"} dark={dark}>Ürünler</MainScreenItem>
                            <MainScreenItem to={"/product/add"} dark={dark}>Ürün Girişi</MainScreenItem>
                        </div>
                        <div className="main-screen-sides">
                            <MainScreenItem to={"/refund/create"} dark={dark}>İade İşlemleri</MainScreenItem>
                            <MainScreenItem to={"/purchase/list"} dark={dark}>Makbuzlar</MainScreenItem>
                            <MainScreenItem to={"/summary/calculate"} dark={dark}>Raporlar</MainScreenItem>
                        </div>
                    </div>
                </div>
                <div className="main-screen-lower-left">
                    <OnlineOfflineIndicator online={isOnline}/>
                </div>
                <div style={{
                    backgroundColor: dark ? "#1E1E1E" : "white",
                    color: dark ? "white" : "black",
                    borderColor: dark ? "white" : "black"
                }} className="main-screen-upper-left">
                    <div>Mağaza No: {status.storeNumber}</div>
                    <div>Kasa No: {status.case} (KASA {status.case})</div>
                    <div>İp No: {status.userIp}</div>
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