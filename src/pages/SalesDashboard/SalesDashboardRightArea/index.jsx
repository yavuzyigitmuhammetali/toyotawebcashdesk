import React from 'react';
import "./salesDashboardRightArea.css"
import {Button} from "@mui/material";


function SalesDashboardRightArea(props) {


    return (
        <div className="right-container">
            <div className="right-one">
                <Button color="success" variant="contained">Yeni İşlem</Button>
                <Button color="error" variant="contained">İşlem İptal Et</Button>
                <Button color="info" variant="contained">İsimden Ara</Button>
                <Button color="secondary" variant="contained">Kampanyalar</Button>
            </div>
            <div className="right-two">

            </div>
        </div>
    );
}

export default SalesDashboardRightArea;