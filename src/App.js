import React from 'react';
// eslint-disable-next-line
import SalesDashboard from "./pages/SalesDashboard";
// eslint-disable-next-line
import PaymentDashboard from "./pages/PaymentDashboard";
import Receipt from "./shared/components/Receipt/Receipt";
import FullScreenAlert from "./shared/components/FullScreenAlert";
import ResponsiveReceipt from "./pages/ResponsiveReceipt";


function App() {
    const dark = true
  return (
/*    <div style={{backgroundColor:dark?"#121212":"white",height:"100vh"}} >
        <PaymentDashboard dark={dark}/>
    </div>*/
      <div>
          <ResponsiveReceipt/>
      </div>
  );
}

export default App;
