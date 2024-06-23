import React, {useCallback, useContext, useEffect, useMemo} from 'react';
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

const ITEMS = [
    {to: "/order/create", text: 'orderCreation', info: 'orderCreationInfo', icon: StorefrontIcon},
    {to: "/products/list", text: 'products', info: 'productsInfo', icon: InventoryIcon},
    {to: "/product/add", text: 'productEntry', info: 'productEntryInfo', icon: AddBusinessIcon},
    {to: "/refund/create", text: 'returnProcesses', info: 'returnProcessesInfo', icon: AssignmentReturnIcon},
    {to: "/purchase/list", text: 'receipts', info: 'receiptsInfo', icon: ReceiptLongIcon},
    {to: "/summary/calculate", text: 'reports', info: 'reportsInfo', icon: SummarizeIcon},
];

function MainScreen() {
    const {isOnline, status, logOut, lang, dark, cashier, performanceMode, colorOptions} = useContext(AppStatusContext);
    const {clearValues} = useContext(KeyboardContext);
    const {t} = useTranslation();

    useEffect(() => {
        document.title = `${config.storeName} • ${t('mainScreen')}`;
        return clearValues;
    }, [clearValues, t]);

    const renderMainScreenItem = useCallback((item, index) => (
        <TooltipProvider
            key={item.to}
            performanceMode={performanceMode}
            dark={dark}
            backgroundColor={colorOptions.tooltip.backgroundColor}
            textColor={colorOptions.tooltip.textColor}
            content={t(item.info)}
        >
            <MainScreenItem
                performanceMode={performanceMode}
                to={item.to}
                dark={dark}
                customIcon={item.icon}
                color={colorOptions.mainScreenItems[index] ?? colorOptions.mainScreenItems.default}
            >
                {t(item.text)}
            </MainScreenItem>
        </TooltipProvider>
    ), [performanceMode, dark, t, colorOptions.tooltip.backgroundColor, colorOptions.tooltip.textColor, colorOptions.mainScreenItems]);

    const middleIndex = Math.floor(ITEMS.length / 2);

    const leftItems = useMemo(() =>
            ITEMS.slice(0, middleIndex).map((item, index) => renderMainScreenItem(item, index)),
        [renderMainScreenItem, middleIndex]
    );

    const rightItems = useMemo(() =>
            ITEMS.slice(middleIndex).map((item, index) => renderMainScreenItem(item, index + middleIndex)),
        [renderMainScreenItem, middleIndex]
    );
    return (
        <>
            <AlertComponent performanceMode={performanceMode}/>
            <div className={`main-screen-container ${performanceMode ? 'performance-mode' : ''}`}>
                <img alt="logo" className="main-screen-logo" src={config.storeLogo.mainScreen}/>
                <div className="main-screen-active-area">
                    <div className="main-screen-sides">{leftItems}</div>
                    <div className="main-screen-sides">{rightItems}</div>
                </div>
            </div>
            <MainScreenLayout
                performanceMode={performanceMode}
                dark={dark}
                lang={lang}
                isOnline={isOnline}
                logOut={logOut}
                status={status}
                cashier={cashier}
                t={t}
            />
        </>
    );
}

export default MainScreen;