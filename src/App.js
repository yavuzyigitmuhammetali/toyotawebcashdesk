import React from 'react';
import SalesDashboard from "./pages/SalesDashboard";
import PaymentDashboard from "./pages/PaymentDashboard";


function App() {
    const dark = true
  return (
    <div style={{backgroundColor:dark?"#121212":"white",height:"100vh"}} >
        <SalesDashboard dark={dark}/>
    </div>
  );
}

export default App;
