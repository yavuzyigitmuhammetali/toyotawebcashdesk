import React, {useContext, useEffect} from "react";
import "./index.css";
import LoginPageLeftArea from "./LoginPageLeftArea";
import LoginPageRightArea from "./LoginPageRightArea";
import AppStatusContext from "../../shared/states/AppStatus/context";
import {useTranslation} from "react-i18next";
import config from "../../config.json";

function LoginPage() {
    const {performanceMode} = useContext(AppStatusContext);
    const {t} = useTranslation();
    useEffect(() => {
        document.title = config.storeName + " • " + t('login');
    }, [t]);

    return (
        <div className={`login-page-container `}>
            <div className={`login-page-left-area ${performanceMode ? 'no-animation' : ''}`}>
                <LoginPageLeftArea/>
            </div>
            <div className={`login-page-right-area ${performanceMode ? 'no-animation' : ''}`}>
                <LoginPageRightArea/>
            </div>
        </div>
    );
}

export default LoginPage;
