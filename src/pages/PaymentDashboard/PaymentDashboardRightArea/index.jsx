import React, {useContext} from 'react';
import "./paymentDashboardRightArea.css"
import {Button, CircularProgress} from "@mui/material";
import NumericKeyboard from "../../../shared/components/NumericKeyboard/NumericKeyboard";
import SendIcon from '@mui/icons-material/Send';
import ResponsiveDialog from "../../../shared/components/ResponsiveDialog";
import {usePaymentDashboardRightArea} from "./usePaymentDashboardRightArea";
import AppStatusContext from "../../../shared/states/AppStatus/context";
import {useTranslation} from "react-i18next";


function PaymentDashboardRightArea() {
    const {lang, dark} = useContext(AppStatusContext);
    const {t} = useTranslation();
    const {
        paymentDialog,
        amountRemaining,
        amountPaid,
        cancelTransaction,
        paymentMethod,
        setPaymentMethod,
        isLoading,
        onResponsiveDialogConfirm,
        handleConfirmTransaction
    } = usePaymentDashboardRightArea();

    return (
        <div style={dark ? {backgroundColor: "#121418", borderColor: "white"} : {}}
             className="payment-dashboard-right-area-container">
            <div className="payment-dashboard-right-area-operator">
                <ResponsiveDialog language={lang} onConfirm={cancelTransaction}
                                  title={t('refundAmount') + (amountPaid.toFixed(2) + "$")}
                                  text={t('cancelTransactionWarning')}>
                    <Button disabled={(amountRemaining + amountPaid) === 0} style={{width: "100%"}} color="error"
                            variant="contained">{t('cancelTransaction')}</Button>
                </ResponsiveDialog>
                <Button
                    disabled={amountRemaining !== 0 || amountPaid === 0 || isLoading}
                    color="success"
                    onClick={handleConfirmTransaction}
                    variant="contained"
                    endIcon={isLoading ? <CircularProgress size={20}/> : <SendIcon/>}
                >
                    {t('confirmPayment')}
                </Button>
            </div>
            <div className="payment-dashboard-right-area-pay">
                <div style={{flex: 2}}>
                    <NumericKeyboard allowDecimal
                                     disabled={(amountRemaining + amountPaid) === 0 || paymentMethod === "card" || amountRemaining <= 0}
                                     dark={dark}/>
                </div>
                <div style={{display: "flex", flexDirection: "column", flex: "1 1"}}>
                    <Button disabled={amountRemaining === 0} onClick={() => setPaymentMethod("cash")}
                            style={{flex: 1}} color="info"
                            variant={paymentMethod === "cash" ? "contained" : "outlined"}>{t('cash')}</Button>
                    <Button disabled={amountRemaining === 0} onClick={() => setPaymentMethod("card")}
                            style={{flex: 1}} color="warning"
                            variant={paymentMethod === "card" ? "contained" : "outlined"}>{t('creditCard')}</Button>
                    <ResponsiveDialog language={lang} title={t('simulatePayment')}
                                      text={t('simulatePaymentWarning')} onConfirm={onResponsiveDialogConfirm}
                                      manualOpen={paymentDialog}/>
                </div>
            </div>

        </div>
    );
}

export default PaymentDashboardRightArea;


