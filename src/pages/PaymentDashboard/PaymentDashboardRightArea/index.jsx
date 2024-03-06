import React, {useCallback, useContext, useEffect, useState} from 'react';
import "./paymentDashboardRightArea.css"
import {Button} from "@mui/material";
import NumericKeyboard from "../../../shared/components/NumericKeyboard/NumericKeyboard";
import NumericKeyboardContext from "../../../shared/components/NumericKeyboard/context";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import PaymentContext from "../context";
import SendIcon from '@mui/icons-material/Send';
import ResponsiveDialog from "../../../shared/components/ResponsiveDialog";
import {useNavigate} from "react-router-dom";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function PaymentDashboardRightArea({dark=false}) {
    const navigate = useNavigate();
    const [paymentDialog,setPaymentDialog] = useState(0)
    const {setTransaction,amountRemaining,amountPaid,cancelTransaction,confirmTransaction,receipt} = useContext(PaymentContext)
    const {data:numericKeyboardData,setData:setNumericKeyboardData} = useContext(NumericKeyboardContext)
    const [paymentMethod , setPaymentMethod] = useState("cash")
    useEffect(() => {
        if (numericKeyboardData){
            setPaymentDialog(prevState => prevState+1);
        }
    }, [numericKeyboardData]);

    useEffect(() => {
        if (Object.values(receipt).length !== 0){
            navigate('/receipt/'+receipt.receiptNumber, {replace: true,state: { receipt: receipt, successMessage:"Sipariş Onaylandı"}});
        }
    }, [receipt]);
    const onResponsiveDialogConfirm = useCallback(() => {
        if (paymentMethod==="card"){
            setTransaction(amountRemaining,"card");
            setNumericKeyboardData(0);
            setPaymentMethod("cash")
        }else{
            setTransaction(numericKeyboardData,paymentMethod);
            setNumericKeyboardData(0);
        }
    }, [setTransaction, numericKeyboardData, paymentMethod, setNumericKeyboardData, amountRemaining]);

    useEffect(() => {
        if (paymentMethod==="card"){
            setPaymentDialog(prevState => prevState+1);
        }
    }, [paymentMethod]);

    return (
        <ThemeProvider theme={dark?darkTheme:lightTheme}>
            <div style={dark ? {backgroundColor: "#121418", borderColor: "white"} : {}} className="payment-dashboard-right-area-container">
                <div className="payment-dashboard-right-area-operator">
                    <ResponsiveDialog onConfirm={cancelTransaction} title={"İade Tutarı : "+ (amountPaid.toFixed(2) +"$")}
                    text={"Şu anda siparişi iptal etmek üzeresiniz onaylamanızı durumunda ödenmiş olan tutar iade edilip, ürünler müşteriye teslim edilemeyecektir"}>
                        <Button disabled={(amountRemaining+amountPaid)===0} style={{width:"100%"}} color="error" variant="contained">İşlem İptal Et</Button>
                    </ResponsiveDialog>
                    <Button disabled={amountRemaining!==0||amountPaid===0} color="success" onClick={confirmTransaction} variant="contained" endIcon={<SendIcon />}>Ödeme Onayala</Button>
                </div>
                    <div className="payment-dashboard-right-area-pay">
                        <div style={{flex:2}}>
                            <NumericKeyboard allowDecimal disabled={(amountRemaining+amountPaid)===0} dark={dark}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", flex: "1 1"}}>
                            <Button disabled={amountRemaining===0} onClick={() => setPaymentMethod("cash")} style={{flex: 1}} color="info"
                                    variant={paymentMethod === "cash" ? "contained" : "outlined"}>Nakit</Button>
                            <Button disabled={amountRemaining===0} onClick={() => setPaymentMethod("card")} style={{flex: 1}} color="warning"
                                    variant={paymentMethod === "card" ? "contained" : "outlined"}>Kredi Kartı</Button>
                            <ResponsiveDialog title={"Ödeme Simüle Et"} text={"Bu uygulama gerçek bir uygulama değil, bundan ötürü ödemenin doğru gerçekleşip gerçekleşmediğini varsayaymalıyız!"} onConfirm={onResponsiveDialogConfirm}  manualOpen={paymentDialog}/>
                        </div>
                    </div>

            </div>
        </ThemeProvider>
    );
}

export default PaymentDashboardRightArea;