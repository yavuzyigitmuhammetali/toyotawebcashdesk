import React, {useContext, useEffect} from "react";
import "./index.css";
import LoginPageLeftArea from "./LoginPageLeftArea";
import LoginPageRightArea from "./LoginPageRightArea";
import AppStatusContext from "../../shared/states/AppStatus/context";
import {useTranslation} from "react-i18next";
import config from "../../config.json";

function LoginPage() {
    const {dark} = useContext(AppStatusContext);
    const {t} = useTranslation();
    useEffect(() => {
        document.title = config.storeName + " • " + t('login');
    }, [t]);

    return (
        <div className={`login-page-container ${dark ? "dark-mode" : "light-mode"}`}>
            <div className="login-page-left-area">
                <LoginPageLeftArea/>
            </div>
            <div className="login-page-right-area">
                <LoginPageRightArea/>
            </div>
        </div>
    );
}

export default LoginPage;