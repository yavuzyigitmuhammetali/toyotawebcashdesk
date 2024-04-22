import React from 'react';
import PaymentDashboardLeftArea from "./PaymentDashboardLeftArea";
import PaymentDashboardMiddleArea from "./PaymentDashboardMiddleArea";
import PaymentDashboardRightArea from "./PaymentDashboardRightArea";
import {PaymentProvider} from "./context";
import {NumericKeyboardProvider} from "../../shared/components/NumericKeyboard/context";
import "./index.css"


function PaymentDashboard() {
    return (
        <div className="payment-dashboard-container">
            <PaymentProvider>
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