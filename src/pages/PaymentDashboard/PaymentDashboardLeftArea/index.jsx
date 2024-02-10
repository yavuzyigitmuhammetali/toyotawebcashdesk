import React from 'react';
import "./paymentDashboardLeftArea.css"
import DigitalArea from "./components/DigitalArea/DigitalArea";
import FormDialog from "../../../shared/components/FormDialog";
import {KeyboardProvider} from "../../../shared/components/ScreenKeyboard/context";

function PaymentDashboardLeftArea({dark = false}) {

    const isValidEmail=(email)=>{
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || email.length === 0) {
            return false;
        }
        return regex.test(email);
    }

    return (
        <div className="payment-dashboard-left-area-container">
            <div>
                <DigitalArea dark={dark} totalPrice={150} data={[{price:10,type:"cash"},{price:100,type:"card"}]}/>
            </div>
            <div style={{flex:"1 1 100%"}}>
                <KeyboardProvider>
                    <FormDialog style={{width:"100%"}} buttonName={"E-fatura"}
                                func={isValidEmail}
                                label={"Müşteri Mail"}
                                errorText={"Bu geçerli bir mail adresi değil!"}
                        //onOff={}
                                dark={dark}
                                dialog={"Doğaya katkıda bulunuyorsun!  E-faturanızla gereksiz kağıt kullanımı azalttın. Teşekkürler! "}/>
                </KeyboardProvider>
                </div>
        </div>
    );
}

export default PaymentDashboardLeftArea;