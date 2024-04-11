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
import {useTranslation} from 'react-i18next';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SummarizeIcon from '@mui/icons-material/Summarize';
import KeyboardContext from '../../shared/components/ScreenKeyboard/context';

function MainScreen() {
    const {isOnline, status, logOut, lang, dark} = React.useContext(AppStatusContext);
    const {clearValues} = React.useContext(KeyboardContext);
    const {t} = useTranslation();

    React.useEffect(() => {
        return () => {
            clearValues();
        };
    }, [clearValues]);


    return (<>
            <ThemeProvider theme={createTheme({palette: {mode: dark ? "dark" : "light"}})}>
                <AlertComponent/>
                <div style={{backgroundColor: dark ? "#111418" : "#F8FAFB"}} className="main-screen-container">
                    <div className="main-screen-active-area">
                        <div className="main-screen-sides">
                            <MainScreenItem to={"/order/create"} dark={dark}
                                            customIcon={StorefrontIcon}>{t('orderCreation')}</MainScreenItem>
                            <MainScreenItem to={"/products/list"} dark={dark}
                                            customIcon={InventoryIcon}>{t('products')}</MainScreenItem>
                            <MainScreenItem to={"/product/add"} dark={dark}
                                            customIcon={AddBusinessIcon}>{t('productEntry')}</MainScreenItem>
                        </div>
                        <div className="main-screen-sides">
                            <MainScreenItem to={"/refund/create"} dark={dark}
                                            customIcon={AssignmentReturnIcon}>{t('returnProcesses')}</MainScreenItem>
                            <MainScreenItem to={"/purchase/list"} dark={dark}
                                            customIcon={ReceiptLongIcon}>{t('receipts')}</MainScreenItem>
                            <MainScreenItem to={"/summary/calculate"} dark={dark}
                                            customIcon={SummarizeIcon}>{t('reports')}</MainScreenItem>
                        </div>
                    </div>
                </div>
                <div className="main-screen-lower-left">
                    <OnlineOfflineIndicator dark={dark} language={lang} online={isOnline}/>
                </div>
                <div style={{
                    backgroundColor: dark ? "#1E1E1E" : "white",
                    color: dark ? "white" : "black",
                    borderColor: dark ? "white" : "black"
                }} className="main-screen-upper-left">
                    <div>{t('storeNo')}: {status.storeNumber}</div>
                    <div>{t('cashRegisterNo')}: {status.case} ({t('register').toUpperCase()} {status.case})</div>
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