import React from 'react';
import {IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import OnlineOfflineIndicator from "../../../shared/components/OnlineOfflineIndicator/OnlineOfflineIndicator";
import SettingsDashboard from "../../SettingsDashboard";
import TooltipProvider from "../../../shared/components/TooltipProvider/TooltipProvider";

function MainScreenLayout({dark, lang, isOnline, logOut, status, cashier, t, performanceMode = false}) {
    const renderStatusInfo = () => (
        <>
            <div>{t('storeNo')}: {status.storeNumber}</div>
            <div>{t('cashRegisterNo')}: {status.case} ({t('register').toUpperCase()} {status.case})</div>
            <div>{t('ipNo')}: {status.userIp}</div>
            <div>{t('version')}: {status.version}</div>
            <div>{t('cashierName')}: {cashier.cashierName}</div>
        </>
    );

    return (
        <>
            <div className="main-screen-lower-left">
                <OnlineOfflineIndicator performanceMode={performanceMode} dark={dark} language={lang}
                                        online={isOnline}/>
            </div>
            <div className={`main-screen-upper-left ${dark ? 'dark' : ''}`}>
                {renderStatusInfo()}
            </div>
            <div className="main-screen-upper-right">
                <TooltipProvider performanceMode={performanceMode} dark={dark} content={t('settings')}
                                 position="bottom">
                    <SettingsDashboard/>
                </TooltipProvider>
            </div>
            <div className="main-screen-lower-right">
                <TooltipProvider performanceMode={performanceMode} dark={dark} content={t('logout')}>
                    <IconButton onClick={logOut} color="error" aria-label="logout">
                        <LogoutIcon/>
                    </IconButton>
                </TooltipProvider>
            </div>
        </>
    );
}

export default React.memo(MainScreenLayout);