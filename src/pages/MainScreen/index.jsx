// src/pages/MainScreen/index.jsx
import React, {useContext, useEffect} from 'react';
import "./index.css";
import AlertComponent from "../../shared/components/AlertComponent";
import AppStatusContext from "../../shared/states/AppStatus/context";
import MainScreenItem from "./components/MainScreenItem/MainScreenItem";
import {useTranslation} from 'react-i18next';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SummarizeIcon from '@mui/icons-material/Summarize';
import KeyboardContext from '../../shared/components/ScreenKeyboard/context';
import MainScreenLayout from "./components/MainScreenLayout";
import config from "../../config.json";
import TooltipProvider from "../../shared/components/TooltipProvider/TooltipProvider";

const icons = {
    orderCreation: StorefrontIcon,
    products: InventoryIcon,
    productEntry: AddBusinessIcon,
    returnProcesses: AssignmentReturnIcon,
    receipts: ReceiptLongIcon,
    reports: SummarizeIcon,
};

const items = [
    {
        to: "/order/create",
        text: 'orderCreation',
        info: 'orderCreationInfo',
        icon: icons.orderCreation,
        color: "#3D526D"
    },
    {to: "/products/list", text: 'products', info: 'productsInfo', icon: icons.products, color: "#3D526D"},
    {to: "/product/add", text: 'productEntry', info: 'productEntryInfo', icon: icons.productEntry, color: "#3D526D"},
    {
        to: "/refund/create",
        text: 'returnProcesses',
        info: 'returnProcessesInfo',
        icon: icons.returnProcesses,
        color: "#3D526D"
    },
    {to: "/purchase/list", text: 'receipts', info: 'receiptsInfo', icon: icons.receipts, color: "#3D526D"},
    {to: "/summary/calculate", text: 'reports', info: 'reportsInfo', icon: icons.reports, color: "#3D526D"},
];

function MainScreen() {
    const {isOnline, status, logOut, lang, dark, cashier, performanceMode} = useContext(AppStatusContext);
    const {clearValues} = useContext(KeyboardContext);
    const {t} = useTranslation();

    useEffect(() => {
        document.title = `${config.storeName} • ${t('mainScreen')}`;
        return () => {
            clearValues();
        };
    }, [clearValues, t]);

    return (
        <>
            <AlertComponent performanceMode={performanceMode}/>
            <div className={`main-screen-container ${performanceMode ? 'performance-mode' : ''}`}>
                <img alt="logo" className="main-screen-logo" src={config.storeLogo}/>
                <div className="main-screen-active-area">
                    <div className="main-screen-sides">
                        {items.slice(0, items.length / 2).map(({to, text, info, icon: Icon, color}) => (
                            <TooltipProvider key={to} performanceMode={performanceMode} dark={dark}
                                             backgroundColor="#6F8AB6" textColor="white" content={t(info)}>
                                <MainScreenItem performanceMode={performanceMode} to={to} dark={dark} customIcon={Icon}
                                                color={color}>
                                    {t(text)}
                                </MainScreenItem>
                            </TooltipProvider>
                        ))}
                    </div>
                    <div className="main-screen-sides">
                        {items.slice(items.length / 2).map(({to, text, info, icon: Icon, color}) => (
                            <TooltipProvider key={to} performanceMode={performanceMode} dark={dark}
                                             backgroundColor="#6F8AB6" textColor="white" content={t(info)}>
                                <MainScreenItem performanceMode={performanceMode} to={to} dark={dark} customIcon={Icon}
                                                color={color}>
                                    {t(text)}
                                </MainScreenItem>
                            </TooltipProvider>
                        ))}
                    </div>
                </div>
            </div>
            <MainScreenLayout performanceMode={performanceMode} dark={dark} lang={lang} isOnline={isOnline}
                              logOut={logOut} status={status} cashier={cashier} t={t}/>
        </>
    );
}

export default MainScreen;