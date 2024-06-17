import React, {useContext} from "react";
import "./index.css";
import {Outlet} from "react-router-dom";
import {useMainContainer} from "./useMainContainer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppStatusContext from "../../shared/states/AppStatus/context";
import {useTranslation} from "react-i18next";

function MainContainer() {
    const {status, isOnline, lang, dark, performanceMode} = useContext(AppStatusContext);
    const {t} = useTranslation();
    const {
        formattedDate,
        pageTitle,
        prevLink
    } = useMainContainer(lang, t);

    return (
        <div className={`main-container-body ${performanceMode ? 'performance' : ''}`}>
            <Header dark={dark} pageTitle={pageTitle} prevLink={prevLink} performanceMode={performanceMode}/>
            <main className={`main-container-main ${performanceMode ? 'performance' : ''}`}>
                <Outlet/>
            </main>
            <Footer dark={dark} lang={lang} formattedDate={formattedDate} isOnline={isOnline} status={status} t={t}
                    performanceMode={performanceMode}/>
        </div>
    );
}

export default MainContainer;