import React from 'react';
import "./mainScreen.css"
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

function MainScreen() {
    const {isOnline, status, logOut, lang, dark, cashier} = React.useContext(AppStatusContext);
    const {clearValues} = React.useContext(KeyboardContext);
    const {t} = useTranslation();

    React.useEffect(() => {
        return () => {
            clearValues();
        };
    }, [clearValues]);


    return (<>
            <AlertComponent/>
            <div className={`main-screen-container ${dark ? 'dark' : ''}`}>
                <div className="main-screen-active-area">
                    <div className="main-screen-sides">
                        <MainScreenItem to={"/order/create"} dark={dark}
                                        customIcon={StorefrontIcon}>{t('orderCreation')}</MainScreenItem>
                        <MainScreenItem to={"/products/list"} dark={dark}
                                        customIcon={InventoryIcon}>{t('products')}</MainScreenItem>
                        <MainScreenItem to={"/product/add"} dark={dark}
                                        customIcon={AddBusinessIcon}>{t('productEntry')}</MainScreenItem>
                    </div>
                    <div className="main-screen-sides">
                        <MainScreenItem to={"/refund/create"} dark={dark}
                                        customIcon={AssignmentReturnIcon}>{t('returnProcesses')}</MainScreenItem>
                        <MainScreenItem to={"/purchase/list"} dark={dark}
                                        customIcon={ReceiptLongIcon}>{t('receipts')}</MainScreenItem>
                        <MainScreenItem to={"/summary/calculate"} dark={dark}
                                        customIcon={SummarizeIcon}>{t('reports')}</MainScreenItem>
                    </div>
                </div>
            </div>
            <MainScreenLayout dark={dark} lang={lang} isOnline={isOnline} logOut={logOut} status={status}
                              cashier={cashier} t={t}/>
        </>

    );
}

export default MainScreen;
