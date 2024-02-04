import React from 'react';
import SalesDashboardLeftArea from "./SalesDashboardLeftArea";

function SalesDashboard() {
    return (
        <div style={{display:"flex",flexDirection:"row"}}>
            <SalesDashboardLeftArea/>
        </div>
    );
}

export default SalesDashboard;