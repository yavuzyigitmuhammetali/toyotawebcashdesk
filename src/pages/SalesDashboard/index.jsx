import React from 'react';
import SalesDashboardLeftArea from "./SalesDashboardLeftArea";
import SalesDashboardMiddleArea from "./SalesDashboardMiddleArea";
import SalesDashboardRightArea from "./SalesDashboardRightArea";
import {NumericKeyboardProvider} from "../../shared/components/NumericKeyboard/context";
import {CartProvider} from "./context";

function SalesDashboard({dark = false}) {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between",padding:"1px"}}>
            <CartProvider>
                <NumericKeyboardProvider>
                    <SalesDashboardLeftArea dark={dark}/>
                    <SalesDashboardMiddleArea dark={dark}/>
                    <SalesDashboardRightArea dark={dark}/>
                </NumericKeyboardProvider>
            </CartProvider>
        </div>
    );
}

export default SalesDashboard;