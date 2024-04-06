import React, {useCallback, useContext, useState} from 'react';
import "./salesDashboardRightArea.css"
import {Button, IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import NumericKeyboard from "../../../shared/components/NumericKeyboard/NumericKeyboard";
import CartContext from "../context";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import FormDialog from "../../../shared/components/FormDialog";
import {checkIdentityNumber} from "../functions/studentValidate";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ProductShowcase from "../../../shared/components/ProductShowcase/ProductShowcase";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {useNavigate} from "react-router-dom";
import ResponsiveDialog from "../../../shared/components/ResponsiveDialog";
import KeyboardContext from '../../../shared/components/ScreenKeyboard/context';
import ScreenKeyboard from '../../../shared/components/ScreenKeyboard/ScreenKeyboard';
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../../shared/state/AppStatus/context";
import {darkTheme,lightTheme} from "./theme";


function SalesDashboardRightArea() {
    const {lang,dark} = useContext(AppStatusContext);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const keyboardContext = useContext(KeyboardContext);
    const {discounts, toggleDiscounts, products, addToCart,cancelTransaction,cart,confirmCart} = useContext(CartContext);
    const [campaignsWindow, setCampaignsWindow] = useState({first: false, other: true});
    const [productShowcaseWindow, setProductShowcaseWindow] = useState(false);


    const handleConfirmCart = useCallback(() => {
        if (confirmCart()){
            navigate('/order/payment', {replace: true});
        }else {
            navigate('/', {replace: true, state: {errorMessage: t('errorAddingProductToCart')}})
        }
    }, [confirmCart, navigate, t]);


    const handleStudentTaxFree = (val) => {
        if (checkIdentityNumber(val)) {
            toggleDiscounts("studentTaxFree")
            return true;
        } else {
            return false
        }
    }

    return (<ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <div style={{backgroundColor: dark ? "#121418" : "", borderColor: dark ? "white" : ""}}
                 className="sales-dashboard-right-area-container">
                <div className="sales-dashboard-right-area-control">
                    <ResponsiveDialog language={lang} title={t('cancelTransaction')} text={t('cancelTransactionWarning')} onConfirm={cancelTransaction}>
                        <Button color="error" variant="contained"> {t('cancelTransaction')}</Button>
                    </ResponsiveDialog>
                    <Button onClick={()=>setProductShowcaseWindow(!productShowcaseWindow)} color="info" variant="contained">{t('searchByName')}</Button>
                    <Button onClick={() => setCampaignsWindow({first: true, other: true})} color="secondary"
                            variant="contained">{t('campaigns')}</Button>
                    <Button disabled={cart.length===0} color="success" onClick={handleConfirmCart} variant="contained" endIcon={<SendIcon/>}>{t('paymentScreen')}</Button>

                </div>
                <div className="sales-dashboard-right-area-keyboard">
                    <NumericKeyboard dark={dark}/>
                </div>
                {campaignsWindow.first && <div style={{
                    borderColor: dark ? "white" : "",
                    animation: campaignsWindow.other ? "jell-in-top 0.5s ease-in-out forwards" : "jell-out-top 0.5s ease-in-out forwards",
                    backgroundColor: dark ? "#131922" : ""
                }} className="sales-dashboard-right-area-campaigns">

                    <IconButton onClick={() => setCampaignsWindow({first: true, other: false})}>
                        <ArrowUpwardIcon/>
                    </IconButton>
                    <Button onClick={() => toggleDiscounts("buy3pay2")} style={{fontSize: 14}}
                            color={discounts.buy3pay2 ? "success" : "error"} variant="contained">{t('buy3Pay2')}</Button>
                        <FormDialog
                            language={lang}
                            dialog={t('taxFreeForStudents')}
                            dark={dark}
                            errorText={t('errorInvalidStudentID')}
                            label={t('studentID')}
                            disabled={discounts.studentTaxFree}
                            onOff={discounts.studentTaxFree}
                            ScreenKeyboardComponent={ScreenKeyboard}
                            keyboardContext={keyboardContext}
                            buttonName={t('studentTaxFree')}
                            func={handleStudentTaxFree}/>
                    <Button onClick={() => toggleDiscounts("percentageDiscounts")} style={{fontSize: 14}}
                            color={discounts.percentageDiscounts ? "success" : "error"} variant="contained">{t('percentageDiscounts')}</Button>
                </div>}
                {productShowcaseWindow?
                    <>
                    <div style={{position:"fixed",left:0,top:"4vh",zIndex:12}}>
                        <IconButton onClick={()=>setProductShowcaseWindow(false)}  color="error">
                            <CloseOutlinedIcon/>
                        </IconButton>
                    </div>
                        <ProductShowcase language={lang} ScreenKeyboardComponent={ScreenKeyboard} keyboardContext={keyboardContext} dark={dark} onClick={addToCart} data={products}/>
                </>
                    :
                    <></>}

            </div>
        </ThemeProvider>);
}
export default SalesDashboardRightArea;