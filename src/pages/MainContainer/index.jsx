import React, {useContext, useMemo} from "react";
import {Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../shared/states/AppStatus/context";
import {useMainContainer} from "./useMainContainer";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";

function MainContainer() {
    const {status, isOnline, lang, dark, performanceMode} = useContext(AppStatusContext);
    const {t} = useTranslation();
    const {formattedDate, pageTitle, prevLink} = useMainContainer(lang, t);

    const containerClass = useMemo(() => {
        return `main-container ${performanceMode ? 'performance' : ''}`;
    }, [performanceMode]);

    return (
        <div className={containerClass}>
            <Header
                dark={dark}
                pageTitle={pageTitle}
                prevLink={prevLink}
                performanceMode={performanceMode}
            />
            <main className="main-container__main">
                <Outlet/>
            </main>
            <Footer
                dark={dark}
                lang={lang}
                formattedDate={formattedDate}
                isOnline={isOnline}
                status={status}
                t={t}
                performanceMode={performanceMode}
            />
        </div>
    );
}

export default MainContainer;