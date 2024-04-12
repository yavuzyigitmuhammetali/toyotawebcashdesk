import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import "./paymentDashboardLeftArea.css"
import DigitalArea from "./components/DigitalArea/DigitalArea";
import FormDialog from "../../../shared/components/FormDialog";
import PaymentContext from "../context";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import AppStatusContext from "../../../shared/state/AppStatus/context";

function PaymentDashboardLeftArea() {
    const {total, paymentTransactions} = useContext(PaymentContext)
    const keyboardContext = useContext(KeyboardContext)
    const {lang, dark} = useContext(AppStatusContext);
    const [email, setEmail] = useState("")
    const {t} = useTranslation();
    const isValidEmail = (email) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email || email.length === 0) {
            return false;
        }
        if (regex.test(email)) {
            setEmail(email);
            return true;
        }
        return false;
    }

    return (
        <div style={{backgroundColor: dark ? "#121418" : "", borderColor: dark ? "white" : ""}}
             className="payment-dashboard-left-area-container">
            <div>
                <DigitalArea dark={dark} totalPrice={total} data={paymentTransactions}/>
            </div>
            <div>
                <FormDialog language={lang} disabled={!total || email.length > 0} style={{width: "100%"}} buttonName={t('eInvoice')}
                            func={isValidEmail}
                            label={t('customerEmail')}
                            errorText={t('invalidEmailError')}
                    //onOff={}
                            dark={dark}
                            ScreenKeyboardComponent={ScreenKeyboard}
                            keyboardContext={keyboardContext}
                            dialog={t('contributeToNature')}/>
            </div>
        </div>
    );
}

export default PaymentDashboardLeftArea;