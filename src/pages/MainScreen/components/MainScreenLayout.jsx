import React from 'react';
import {IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import OnlineOfflineIndicator from "../../../shared/components/OnlineOfflineIndicator/OnlineOfflineIndicator";
import SettingsDashboard from "../../SettingsDashboard";

function MainScreenLayout({dark, lang, isOnline, logOut, status, cashier, t}) {
    return (
        <>
            <div className="main-screen-lower-left">
                <OnlineOfflineIndicator dark={dark} language={lang} online={isOnline}/>
            </div>
            <div className={`main-screen-upper-left ${dark ? 'dark' : ''}`}>
                <div>{t('storeNo')}: {status.storeNumber}</div>
                <div>{t('cashRegisterNo')}: {status.case} ({t('register').toUpperCase()} {status.case})</div>
                <div>{t('ipNo')}: {status.userIp}</div>
                <div>{t('version')}: {status.version}</div>
                <div>{t('cashierName')}: {cashier.cashierName}</div>
            </div>
            <div className="main-screen-upper-right">
                <SettingsDashboard/>
            </div>
            <div className="main-screen-lower-right">
                <IconButton onClick={logOut} color="error" aria-label="delete">
                    <LogoutIcon/>
                </IconButton>
            </div>
        </>
    );
}

export default MainScreenLayout;