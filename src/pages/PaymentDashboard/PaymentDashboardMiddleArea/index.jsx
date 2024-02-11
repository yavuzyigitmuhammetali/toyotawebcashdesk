import React from 'react';
import "./paymentDashboardMiddleArea.css"
import ShoppingCartItem
    from "../../../shared/components/ShoppingCartItem/ShoppingCartItem";

function PaymentDashboardMiddleArea({dark = false}) {
    return (
        <div style={dark ? {backgroundColor: "#121418", borderColor: "white"} : {}} className="payment-dashboard-middle-area-container">
            <div style={{borderColor: dark? "white":"", backgroundColor: dark ? "#111923" : "white"}} className="payment-dashboard-middle-area-products-scroll">
                <div className="payment-dashboard-middle-area-products">
                    <ShoppingCartItem disabled dark={dark}/>
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