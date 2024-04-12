import React from 'react';
import OnlineOfflineIndicator from "../../../shared/components/OnlineOfflineIndicator";


const Footer = ({dark, lang, isOnline, formattedDate, status, t}) => (
    <footer style={{backgroundColor: dark && "rgb(28, 31, 37)"}} className="main-container-footer">
        <div>
            <OnlineOfflineIndicator dark={dark} language={lang} online={isOnline}/>
        </div>
        <div>{formattedDate}</div>
        <div style={{display: "flex", flexDirection: "column"}}>
            <span>{t("cashRegister")}: {status.case}</span>
            <span>{t("store")}: {status.storeNumber}</span>
        </div>
    </footer>
);

export default Footer;