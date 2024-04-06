import React, {useContext} from "react";
import "./loginPage.css";
import LoginPageLeftArea from "./LoginPageLeftArea";
import LoginPageRightArea from "./LoginPageRightArea";
import AppStatusContext from "../../shared/state/AppStatus/context";

function LoginPage() {
    const {dark} = useContext(AppStatusContext);
    return (
        <div style={{ backgroundColor: dark ? "#111418" : "#E9ECF7" }} className="login-page-container">
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
