import React from 'react';
import "./index.css"
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

function MainScreen() {
    const {isOnline, status, logOut, lang, dark, cashier} = React.useContext(AppStatusContext);
    const {clearValues} = React.useContext(KeyboardContext);
    const {t} = useTranslation();

    React.useEffect(() => {
        document.title = config.storeName + " • " + t('mainScreen');
        return () => {
            clearValues();
        };
    }, [clearValues, t]);


    return (<>
            <AlertComponent/>
            <div className={`main-screen-container ${dark ? 'dark' : ''}`}>
                <img
                    alt={"logo"}
                    className="main-screen-logo"
                    src={config.storeLogo}/>
                <div className="main-screen-active-area">
                    <div className="main-screen-sides">
                        <TooltipProvider dark={dark} backgroundColor="#6F8AB6" textColor="white"
                                         content={t('orderCreationInfo')}>
                            <MainScreenItem to={"/order/create"} dark={dark} customIcon={StorefrontIcon}>
                                {t('orderCreation')}
                            </MainScreenItem>
                        </TooltipProvider>

                        <TooltipProvider dark={dark} backgroundColor="#6F8AB6" textColor="white"
                                         content={t('productsInfo')}>
                            <MainScreenItem to={"/products/list"} dark={dark} customIcon={InventoryIcon}>
                                {t('products')}
                            </MainScreenItem>
                        </TooltipProvider>

                        <TooltipProvider dark={dark} backgroundColor="#6F8AB6" textColor="white"
                                         content={t('productEntryInfo')}>
                            <MainScreenItem to={"/product/add"} dark={dark} customIcon={AddBusinessIcon}>
                                {t('productEntry')}
                            </MainScreenItem>
                        </TooltipProvider>
                    </div>
                    <div className="main-screen-sides">
                        <TooltipProvider dark={dark} backgroundColor="#6F8AB6" textColor="white"
                                         content={t('returnProcessesInfo')}>
                            <MainScreenItem to={"/refund/create"} dark={dark} customIcon={AssignmentReturnIcon}>
                                {t('returnProcesses')}
                            </MainScreenItem>
                        </TooltipProvider>

                        <TooltipProvider dark={dark} backgroundColor="#6F8AB6" textColor="white"
                                         content={t('receiptsInfo')}>
                            <MainScreenItem to={"/purchase/list"} dark={dark} customIcon={ReceiptLongIcon}>
                                {t('receipts')}
                            </MainScreenItem>
                        </TooltipProvider>

                        <TooltipProvider dark={dark} backgroundColor="#6F8AB6" textColor="white"
                                         content={t('reportsInfo')}>
                            <MainScreenItem to={"/summary/calculate"} dark={dark} customIcon={SummarizeIcon}>
                                {t('reports')}
                            </MainScreenItem>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
            <MainScreenLayout dark={dark} lang={lang} isOnline={isOnline} logOut={logOut} status={status}
                              cashier={cashier} t={t}/>
        </>

    );
}

export default MainScreen;
