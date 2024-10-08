import React from 'react';
import SalesDashboardLeftArea from "./SalesDashboardLeftArea";
import SalesDashboardMiddleArea from "./SalesDashboardMiddleArea";
import SalesDashboardRightArea from "./SalesDashboardRightArea";
import {NumericKeyboardProvider} from "../../shared/components/NumericKeyboard/context";
import {CartProvider} from "./context";
import "./index.css";

function SalesDashboard() {
    return (
        <div className="sales-dashboard-container">
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