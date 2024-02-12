import React from 'react';
// eslint-disable-next-line
import SalesDashboard from "./pages/SalesDashboard";
// eslint-disable-next-line
import PaymentDashboard from "./pages/PaymentDashboard";
import ResponsiveReceipt from "./shared/components/ResponsiveReceipt/ResponsiveReceipt";
import FullScreenAlert from "./shared/components/FullScreenAlert";


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
