import React, {useState} from 'react';
import "./paymentDashboardRightArea.css"
import {Button} from "@mui/material";
import NumericKeyboard from "../../../shared/components/NumericKeyboard/NumericKeyboard";
import {NumericKeyboardProvider} from "../../../shared/components/NumericKeyboard/context";
import {createTheme, ThemeProvider} from "@mui/material/styles";

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
    const [paymentMethod , setPaymentMethod] = useState("")
    return (
        <ThemeProvider theme={dark?darkTheme:lightTheme}>
            <div style={dark ? {backgroundColor: "#121418", borderColor: "white"} : {}} className="payment-dashboard-right-area-container">
                <div className="payment-dashboard-right-area-operator">
                    <Button color="error" variant="contained">İşlem İptal Et</Button>
                    <Button color="success" variant="contained">Ödeme Onayala</Button>
                </div>
                <NumericKeyboardProvider>

                    <div className="payment-dashboard-right-area-pay">
                        <NumericKeyboard dark={dark}/>
                        <div style={{display: "flex", flexDirection: "column", flex: "1 1"}}>
                            <Button onClick={() => setPaymentMethod("cash")} style={{flex: 1}} color="info"
                                    variant={paymentMethod === "cash" ? "contained" : "outlined"}>Nakit</Button>
                            <Button onClick={() => setPaymentMethod("card")} style={{flex: 1}} color="warning"
                                    variant={paymentMethod === "card" ? "contained" : "outlined"}>Kredi Kartı</Button>
                        </div>

                    </div>

                </NumericKeyboardProvider>
            </div>
        </ThemeProvider>
    );
}

export default PaymentDashboardRightArea;