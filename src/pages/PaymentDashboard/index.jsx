import React from 'react';
import PaymentDashboardLeftArea from "./PaymentDashboardLeftArea";
import PaymentDashboardMiddleArea from "./PaymentDashboardMiddleArea";
import PaymentDashboardRightArea from "./PaymentDashboardRightArea";

function PaymentDashboard({dark = false}) {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between",padding:"1px"}}>
            <PaymentDashboardLeftArea dark={dark}/>
            <PaymentDashboardMiddleArea dark={dark}/>
            <PaymentDashboardRightArea dark={dark}/>
        </div>
    );
}

export default PaymentDashboard;