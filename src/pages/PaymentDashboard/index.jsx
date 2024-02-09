import React from 'react';
import PaymentDashboardLeftArea from "./PaymentDashboardLeftArea";
import PaymentDashboardMiddleArea from "./PaymentDashboardMiddleArea";
import PaymentDashboardRightArea from "./PaymentDashboardRightArea";

function PaymentDashboard(props) {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between",padding:"1px"}}>
            <PaymentDashboardLeftArea/>
            <PaymentDashboardMiddleArea/>
            <PaymentDashboardRightArea/>
        </div>
    );
}

export default PaymentDashboard;