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
    {to: "/order/create", text: 'orderCreation', info: 'orderCreationInfo', icon: icons.orderCreation},
    {to: "/products/list", text: 'products', info: 'productsInfo', icon: icons.products},
    {to: "/product/add", text: 'productEntry', info: 'productEntryInfo', icon: icons.productEntry},
    {to: "/refund/create", text: 'returnProcesses', info: 'returnProcessesInfo', icon: icons.returnProcesses},
    {to: "/purchase/list", text: 'receipts', info: 'receiptsInfo', icon: icons.receipts},
    {to: "/summary/calculate", text: 'reports', info: 'reportsInfo', icon: icons.reports},
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
            <div className={`main-screen-container ${dark ? 'dark' : ''} ${performanceMode ? 'performance-mode' : ''}`}>
                <img alt="logo" className="main-screen-logo" src={config.storeLogo}/>
                <div className="main-screen-active-area">
                    <div className="main-screen-sides">
                        {items.slice(0, items.length / 2).map(({to, text, info, icon: Icon}) => (
                            <TooltipProvider key={to} performanceMode={performanceMode} dark={dark}
                                             backgroundColor="#6F8AB6" textColor="white" content={t(info)}>
                                <MainScreenItem performanceMode={performanceMode} to={to} dark={dark} customIcon={Icon}>
                                    {t(text)}
                                </MainScreenItem>
                            </TooltipProvider>
                        ))}
                    </div>
                    <div className="main-screen-sides">
                        {items.slice(items.length / 2).map(({to, text, info, icon: Icon}) => (
                            <TooltipProvider key={to} performanceMode={performanceMode} dark={dark}
                                             backgroundColor="#6F8AB6" textColor="white" content={t(info)}>
                                <MainScreenItem performanceMode={performanceMode} to={to} dark={dark} customIcon={Icon}>
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