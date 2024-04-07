import React from 'react';
import PaymentDashboardLeftArea from "./PaymentDashboardLeftArea";
import PaymentDashboardMiddleArea from "./PaymentDashboardMiddleArea";
import PaymentDashboardRightArea from "./PaymentDashboardRightArea";
import {PaymentProvider} from "./context";
import {NumericKeyboardProvider} from "../../shared/components/NumericKeyboard/context";
import {data} from "./data";

function PaymentDashboard() {
    return (
        <div style={{flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "1px"}}>
            <PaymentProvider data={data}>
                <PaymentDashboardLeftArea/>
                <PaymentDashboardMiddleArea/>
                <NumericKeyboardProvider>
                    <PaymentDashboardRightArea/>
                </NumericKeyboardProvider>
            </PaymentProvider>
        </div>
    );
}

export default PaymentDashboard;