import React from 'react';
import SalesDashboardLeftArea from "./SalesDashboardLeftArea";
import SalesDashboardMiddleArea from "./SalesDashboardMiddleArea";
import SalesDashboardRightArea from "./SalesDashboardRightArea";
import {NumericKeyboardProvider} from "./components/NumericKeyboard/context";

function SalesDashboard() {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
{/*            <div style={{cursor: "not-allowed"}}>
                <div style={{cursor: "not-allowed", pointerEvents: "none"}}>
                    context test
                </div>
            </div>*/}
            <NumericKeyboardProvider>
                <SalesDashboardLeftArea/>
                <SalesDashboardMiddleArea/>
                <SalesDashboardRightArea/>
            </NumericKeyboardProvider>
        </div>
    );
}

export default SalesDashboard;