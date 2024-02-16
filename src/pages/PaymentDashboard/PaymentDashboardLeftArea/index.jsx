import React, {useContext} from 'react';
import "./paymentDashboardLeftArea.css"
import DigitalArea from "./components/DigitalArea/DigitalArea";
import FormDialog from "../../../shared/components/FormDialog";
import PaymentContext from "../context";

function PaymentDashboardLeftArea({dark = false}) {
    const {total,paymentTransactions} = useContext(PaymentContext)
    const isValidEmail=(email)=>{
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || email.length === 0) {
            return false;
        }
        return regex.test(email);
    }

    return (
        <div style={{backgroundColor:dark?"#121418":"",borderColor:dark?"white":""}} className="payment-dashboard-left-area-container">
            <div>
                <DigitalArea dark={dark} totalPrice={total} data={paymentTransactions}/>
            </div>
            <div>
                    <FormDialog disabled={!total} style={{width:"100%"}} buttonName={"E-fatura"}
                                func={isValidEmail}
                                label={"Müşteri Mail"}
                                errorText={"Bu geçerli bir mail adresi değil!"}
                        //onOff={}
                                dark={dark}
                                dialog={"Doğaya katkıda bulunuyorsun!  E-faturanızla gereksiz kağıt kullanımı azalttın. Teşekkürler! "}/>
                </div>
        </div>
    );
}

export default PaymentDashboardLeftArea;