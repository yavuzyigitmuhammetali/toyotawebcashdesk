import React from 'react';
import SalesDashboardLeftArea from "./SalesDashboardLeftArea";
import SalesDashboardMiddleArea from "./SalesDashboardMiddleArea";
import SalesDashboardRightArea from "./SalesDashboardRightArea";

function SalesDashboard() {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
{/*            <div style={{cursor: "not-allowed"}}>
                <div style={{cursor: "not-allowed", pointerEvents: "none"}}>
                    context test
                </div>
            </div>*/}
            <SalesDashboardLeftArea/>
            <SalesDashboardMiddleArea/>
            <SalesDashboardRightArea/>
        </div>
    );
}

export default SalesDashboard;