import React from 'react';
import "./paymentDashboardMiddleArea.css"
import ProductSummaryCard from "./components/ProductSummaryCard/ProductSummaryCard";

function PaymentDashboardMiddleArea({dark = false}) {
    return (
        <div className="payment-dashboard-middle-area-container">
            <div className="payment-dashboard-middle-area-products-scroll">
                <div className="payment-dashboard-middle-area-products">
                    <ProductSummaryCard/>
                </div>
            </div>
            <div style={dark ? {backgroundColor: "black", color: "white", borderColor: "white"} : {}}
                 className="payment-dashboard-middle-area-texts">
                <div className="payment-dashboard-middle-area-amount">
                    <span>Ara Toplam: </span>
                    <span>10$</span>
                </div>
                <hr style={{borderColor: "Background"}}/>
                <div className="payment-dashboard-middle-area-amount">
                    <span>Toplam Tutar</span>
                    <span>10$</span>
                </div>
            </div>
        </div>
    );
}

export default PaymentDashboardMiddleArea;