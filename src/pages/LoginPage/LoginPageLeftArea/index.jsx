import React, {lazy} from 'react';
import "./loginPageLeftArea.css"
import OnlineOfflineIndicator from "../../../shared/components/OnlineOfflineIndicator";
import AppStatusContext from "../../../shared/state/AppStatus/context";
import {useTranslation} from "react-i18next";
const LoginSrc = lazy(() => import('./components/LoginSrc'));

function LoginPageLeftArea({width = "400px", dark = false, warn = false}) {
    const {isOnline,status} = React.useContext(AppStatusContext);
    const {t} = useTranslation();
    return (
        <div style={{color: dark ? "white" : "#111418", width: width}} className="login-page-left-area-container">
            <div className="login-page-left-area-indicator">
                <OnlineOfflineIndicator online={isOnline}/>
            </div>
            <LoginSrc style={warn&&{filter:"hue-rotate(145deg)"}} dark={dark}/>
            <span className="login-page-left-area-texts good-wish">{t('storeNumber')}: {status.storeNumber}</span>
            <span className="login-page-left-area-texts welcome">{t('welcomeBack')}</span>
            <span className="login-page-left-area-texts explanation">{status.version}</span>
        </div>
    );
}

export default LoginPageLeftArea;
