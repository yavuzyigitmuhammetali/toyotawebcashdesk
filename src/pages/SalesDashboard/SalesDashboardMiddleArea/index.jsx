import React from 'react';
import "./salesDashboardMiddleArea.css"
import ShoppingCartItem from "./components/ShoppingCartItem/ShoppingCartItem";

function SalesDashboardMiddleArea({dark = false}) {
    return (
        <div style={dark ? { backgroundColor: "#121212", borderColor: "white" } : {}}
             className="sales-dashboard-middle-area-container">
            <div style={{borderColor:dark&&"white",backgroundColor:dark?"#111923":"white"}} className="sales-dashboard-middle-area-products-scroll">
                <div className="sales-dashboard-middle-area-products">
                    <ShoppingCartItem/>
                </div>
            </div>
            <div style={dark ? { backgroundColor: "black", color: "white", borderColor: "white" } : {}} className="sales-dashboard-middle-area-texts">
                <div className="sales-dashboard-middle-area-amount">
                    <span>Ara Toplam: </span>
                    <span>15$</span>
                </div>
                <hr style={{borderColor:"Background"}}/>
                <div className="sales-dashboard-middle-area-amount">
                    <span>Toplam Tutar</span>
                    <span>10$</span>
                </div>
            </div>
        </div>
    );
}

export default SalesDashboardMiddleArea;