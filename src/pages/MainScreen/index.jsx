import React from 'react';
import "./mainScreen.css"
import OnlineOfflineIndicator from "../../shared/components/OnlineOfflineIndicator";
import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import AlertComponent from "../../shared/components/AlertComponent";
import AppStatusContext from "../../shared/state/AppStatus/context";
import SettingsDashboard from "./components/SettingsDashboard/SettingsDashboard";
import MainScreenItem from "./components/MainScreenItem/MainScreenItem";
import { useTranslation } from 'react-i18next';

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
    const {isOnline, status, logOut,lang} = React.useContext(AppStatusContext);
    const { t } = useTranslation();

    return (<>
            <ThemeProvider theme={dark ? darkTheme : lightTheme}>
                <AlertComponent/>
                <div style={{backgroundColor: dark ? "#111418" : "#F8FAFB"}} className="main-screen-container">
                    <div className="main-screen-active-area">
                        <div className="main-screen-sides">
                            <MainScreenItem to={"/order/create"} dark={dark} customIcon={LogoutIcon}>{t('orderCreation')}</MainScreenItem>
                            <MainScreenItem to={"/products/list"} dark={dark}>{t('products')}</MainScreenItem>
                            <MainScreenItem to={"/product/add"} dark={dark}>{t('productEntry')}</MainScreenItem>
                        </div>
                        <div className="main-screen-sides">
                            <MainScreenItem to={"/refund/create"} dark={dark}>{t('returnProcesses')}</MainScreenItem>
                            <MainScreenItem to={"/purchase/list"} dark={dark}>{t('receipts')}</MainScreenItem>
                            <MainScreenItem to={"/summary/calculate"} dark={dark}>{t('reports')}</MainScreenItem>
                        </div>
                    </div>
                </div>
                <div className="main-screen-lower-left">
                    <OnlineOfflineIndicator language={lang} online={isOnline}/>
                </div>
                <div style={{
                    backgroundColor: dark ? "#1E1E1E" : "white",
                    color: dark ? "white" : "black",
                    borderColor: dark ? "white" : "black"
                }} className="main-screen-upper-left">
                    <div>{t('storeNo')}: {status.storeNumber}</div>
                    <div>{t('cashRegisterNo')}: {status.case} (KASA {status.case})</div>
                    <div>{t('ipNo')}: {status.userIp}</div>
                    <div>{t('version')}: {status.version}</div>
                </div>
                <div className="main-screen-upper-right">
                    <SettingsDashboard/>
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