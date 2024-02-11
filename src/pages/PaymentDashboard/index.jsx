import React from 'react';
import PaymentDashboardLeftArea from "./PaymentDashboardLeftArea";
import PaymentDashboardMiddleArea from "./PaymentDashboardMiddleArea";
import PaymentDashboardRightArea from "./PaymentDashboardRightArea";
import {PaymentProvider} from "./context";
import {NumericKeyboardProvider} from "../../shared/components/NumericKeyboard/context";
import {data} from "./data";

function PaymentDashboard({dark = false}) {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between",padding:"1px"}}>
            <PaymentProvider data={data}>
                <PaymentDashboardLeftArea dark={dark}/>
                <PaymentDashboardMiddleArea dark={dark}/>
                <NumericKeyboardProvider>
                    <PaymentDashboardRightArea dark={dark}/>
                </NumericKeyboardProvider>
            </PaymentProvider>
        </div>
    );
}

export default PaymentDashboard;