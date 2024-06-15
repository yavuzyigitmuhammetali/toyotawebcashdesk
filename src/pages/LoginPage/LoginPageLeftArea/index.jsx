import React, {lazy} from 'react';
import "./index.css"
import OnlineOfflineIndicator from "../../../shared/components/OnlineOfflineIndicator/OnlineOfflineIndicator";
import AppStatusContext from "../../../shared/states/AppStatus/context";
import {useTranslation} from "react-i18next";
import config from "../../../config";

const LoginSrc = lazy(() => import('./components/LoginSrc'));

function LoginPageLeftArea({width = "400px", warn = false}) {
    const {isOnline, status, lang, dark, performanceMode} = React.useContext(AppStatusContext);
    const {t} = useTranslation();
    return (
        <div className={`login-page-left-area-container ${dark ? 'dark' : 'light'}`} style={{width: width}}>
            <div className="login-page-left-area-indicator">
                <OnlineOfflineIndicator performanceMode={performanceMode} dark={dark} language={lang}
                                        online={isOnline}/>
            </div>
            <img src={config.storeLogo} alt="logo" className="login-page-left-area-logo"/>
            <LoginSrc className={warn ? 'warn' : ''} dark={dark}/>
            <span className="login-page-left-area-texts good-wish">{t('storeNumber')}: {status.storeNumber}</span>
            <span className="login-page-left-area-texts welcome">{t('welcomeBack')}</span>
            <span className="login-page-left-area-texts explanation">{status.version}</span>
        </div>
    );
}

export default LoginPageLeftArea;
