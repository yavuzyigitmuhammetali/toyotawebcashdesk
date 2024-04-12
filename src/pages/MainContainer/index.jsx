import React, {useContext} from "react";
import "./mainContainer.css";
import {Outlet} from "react-router-dom";
import {useMainContainer} from "./useMainContainer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppStatusContext from "../../shared/state/AppStatus/context";
import {useTranslation} from "react-i18next";

function MainContainer() {
    const {status, isOnline, lang, dark} = useContext(AppStatusContext);
    const {t} = useTranslation();
    const {
        formattedDate,
        pageTitle,
        prevLink
    } = useMainContainer(lang, t);


    return (
        <div style={{color: dark ? "white" : "black", backgroundColor: dark ? "rgb(17, 20, 24)" : "white"}}
             className="main-container-body">
            <Header dark={dark} pageTitle={pageTitle} prevLink={prevLink}/>
            <main style={{backgroundColor: dark && "#131922"}} className="main-container-main">
                <Outlet/>
            </main>
            <Footer dark={dark} lang={lang} formattedDate={formattedDate} isOnline={isOnline} status={status} t={t}/>
        </div>
    );
}

export default MainContainer;
