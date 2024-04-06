import React from 'react';
import SalesDashboardLeftArea from "./SalesDashboardLeftArea";
import SalesDashboardMiddleArea from "./SalesDashboardMiddleArea";
import SalesDashboardRightArea from "./SalesDashboardRightArea";
import {NumericKeyboardProvider} from "../../shared/components/NumericKeyboard/context";
import {CartProvider} from "./context";

function SalesDashboard() {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between",padding:"1px"}}>
            <CartProvider>
                <NumericKeyboardProvider>
                    <SalesDashboardLeftArea/>
                    <SalesDashboardMiddleArea/>
                    <SalesDashboardRightArea/>
                </NumericKeyboardProvider>
            </CartProvider>
        </div>
    );
}

export default SalesDashboard;