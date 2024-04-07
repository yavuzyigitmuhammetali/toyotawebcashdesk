import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import "./paymentDashboardRightArea.css"
import {Button, CircularProgress} from "@mui/material";
import NumericKeyboard from "../../../shared/components/NumericKeyboard/NumericKeyboard";
import NumericKeyboardContext from "../../../shared/components/NumericKeyboard/context";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import PaymentContext from "../context";
import SendIcon from '@mui/icons-material/Send';
import ResponsiveDialog from "../../../shared/components/ResponsiveDialog";
import {useNavigate} from "react-router-dom";
import AppStatusContext from "../../../shared/state/AppStatus/context";


function PaymentDashboardRightArea() {
    const {lang, dark} = useContext(AppStatusContext);
    const navigate = useNavigate();
    const [paymentDialog, setPaymentDialog] = useState(0)
    const {
        setTransaction,
        amountRemaining,
        amountPaid,
        cancelTransaction,
        confirmTransaction,
        receipt
    } = useContext(PaymentContext)
    const {data: numericKeyboardData, setData: setNumericKeyboardData} = useContext(NumericKeyboardContext)
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (numericKeyboardData) {
            setPaymentDialog(prevState => prevState + 1);
        }
    }, [numericKeyboardData]);

    useEffect(() => {
        if (Object.values(receipt).length !== 0) {
            navigate('/receipt/' + receipt.receiptNumber, {
                replace: true,
                state: {receipt: receipt, successMessage: "Sipariş Onaylandı"}
            });
        }
    }, [receipt]);
    const onResponsiveDialogConfirm = useCallback(() => {
        if (paymentMethod === "card") {
            setTransaction(amountRemaining, "card");
            setNumericKeyboardData(0);
            setPaymentMethod("cash")
        } else {
            setTransaction(numericKeyboardData, paymentMethod);
            setNumericKeyboardData(0);
        }
    }, [setTransaction, numericKeyboardData, paymentMethod, setNumericKeyboardData, amountRemaining]);

    useEffect(() => {
        if (paymentMethod === "card") {
            setPaymentDialog(prevState => prevState + 1);
        }
    }, [paymentMethod]);

    const handleConfirmTransaction = async () => {
        setIsLoading(true);
        await confirmTransaction();
        setIsLoading(false);
    };

    return (
        <ThemeProvider theme={createTheme({palette: {mode: dark ? "dark" : "light"}})}>
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
            endIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
        >
            {t('confirmPayment')}
        </Button>
                </div>
                <div className="payment-dashboard-right-area-pay">
                    <div style={{flex: 2}}>
                        <NumericKeyboard allowDecimal
                                         disabled={(amountRemaining + amountPaid) === 0 || paymentMethod === "card"}
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
        </ThemeProvider>
    );
}

export default PaymentDashboardRightArea;


