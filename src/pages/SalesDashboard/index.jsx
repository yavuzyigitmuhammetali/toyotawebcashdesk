import React from 'react';
import SalesDashboardLeftArea from "./SalesDashboardLeftArea";
import SalesDashboardMiddleArea from "./SalesDashboardMiddleArea";

function SalesDashboard() {
    return (
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <SalesDashboardLeftArea/>
            <SalesDashboardMiddleArea/>
        </div>
    );
}

export default SalesDashboard;