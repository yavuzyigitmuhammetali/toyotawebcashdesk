import React, {useContext, useState} from 'react';
import "./mainContainer.css"
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import OnlineOfflineIndicator from "../OnlineOfflineIndicator";
import StatusContext from "../../state/context";
import {Link, useLocation} from 'react-router-dom';

function MainContainer({children}) {
    const {status,online} = useContext(StatusContext)
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;

    const location = useLocation();
    let pageTitle;
    let prevLink;
    switch (location.pathname) {
        case '/':
            pageTitle = 'Anasayfa';
            prevLink = '/';
            break;
        case '/order/create':
            pageTitle = 'Sipariş Oluşturma Ekranı';
            prevLink = '/';
            break;
        case '/order/payment':
            pageTitle = 'Ödeme Ekranı';
            prevLink = '/order/create';
            break;
        case '/purchase/list':
            pageTitle = 'Makbuzlar';
            prevLink = '/';
            break;
        case '/refund/create':
            pageTitle = 'İade Ekranı';
            prevLink = '/';
            break;
        default:
            pageTitle = 'Başlık';
    }
    return (
        <div className="main-container-body">
            <header className="main-container-header">
                <div>
                    <IconButton color="error" component={Link} to={prevLink}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                </div>
                <div>
                    {pageTitle.toUpperCase()}
                </div>
                <div>
                    <IconButton color="info">
                        <SettingsIcon/>
                    </IconButton>
                </div>
            </header>
            <main className="main-container-main">
                {children}
            </main>
            <footer className="main-container-footer">
                <div><OnlineOfflineIndicator/></div>
                <div>{formattedDate}</div>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <span>Kasa: {status.case}</span>
                    <span>Mağza: {status.storeNumber}</span>
                </div>
            </footer>
        </div>
    );
}

export default MainContainer;