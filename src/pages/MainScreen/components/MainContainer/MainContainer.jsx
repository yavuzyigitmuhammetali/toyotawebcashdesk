import React, {useContext, useEffect, useState} from 'react';
import "./mainContainer.css"
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import OnlineOfflineIndicator from "../../../../shared/components/OnlineOfflineIndicator";
import AppStatusContext from "../../../../shared/state/AppStatus/context";
import {Link, Outlet, useLocation, useParams} from 'react-router-dom';

function MainContainer() {
    const {status,isOnline} = useContext(AppStatusContext)
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;

    const [pathHistory, setPathHistory] = useState(['/'])

    const location = useLocation();

    useEffect(() => {
        setPathHistory(prevState => [...prevState,location.pathname])
    }, [location.pathname]);

    const { productId,receiptNumber } = useParams();
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
        case '/products/list':
            pageTitle = 'Ürün Listeleme Ekranı';
            prevLink = '/';
            break;
        case '/products/list/':
            pageTitle = 'Ürün Görüntüle';
            prevLink = '/';
            break;
        case '/product/add':
            pageTitle = 'Ürün Ekleme Ekranı';
            prevLink = '/';
            break;
        case '/summary/calculate':
            pageTitle = 'Raporlar';
            prevLink = '/';
            break;
        default:
            if (location.pathname.startsWith('/products/list/')) {
                pageTitle = `${productId} Numaralı Ürününü Görüntüleniyor`;
                prevLink = pathHistory[pathHistory.length-2]==='/summary/calculate'?'/summary/calculate':'/products/list';
            }else if(location.pathname.startsWith('/receipt/')){
                pageTitle = `***${receiptNumber}***`;
                prevLink = pathHistory[pathHistory.length-2]==='/purchase/list'?'/purchase/list':'/';
            }
            else {
                pageTitle = 'Başlık';
                prevLink = '/';
            }
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
                <Outlet/>
            </main>
            <footer className="main-container-footer">
                <div><OnlineOfflineIndicator online={isOnline}/></div>
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