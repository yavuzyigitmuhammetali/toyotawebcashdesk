import React, {useContext} from "react";
import "./index.css";
import LoginPageLeftArea from "./LoginPageLeftArea";
import LoginPageRightArea from "./LoginPageRightArea";
import AppStatusContext from "../../shared/states/AppStatus/context";

function LoginPage() {
    const {dark} = useContext(AppStatusContext);
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