import React, {useContext} from 'react';
import "./salesDashboardRightArea.css"
import {Button} from "@mui/material";
import NumericKeyboard from "../components/NumericKeyboard/NumericKeyboard";
import CartContext from "../context";


function SalesDashboardRightArea() {
    const {discounts, toggleDiscounts} = useContext(CartContext);

    return (
        <div className="sales-dashboard-right-area-container">
            <div className="sales-dashboard-right-area-control">
                <Button color="success" variant="contained">Yeni İşlem</Button>
                <Button color="error" variant="contained">İşlem İptal Et</Button>
                <Button color="info" variant="contained">İsimden Ara</Button>
                <Button onClick={()=>toggleDiscounts("buy3pay2")} color="secondary" variant="contained">Kampanyalar</Button>

            </div>
            <div className="sales-dashboard-right-area-keyboard">
                <NumericKeyboard/>
            </div>
        </div>
    );
}

export default SalesDashboardRightArea;