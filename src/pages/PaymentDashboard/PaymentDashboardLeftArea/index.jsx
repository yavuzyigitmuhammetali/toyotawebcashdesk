import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import "./paymentDashboardLeftArea.css"
import DigitalArea from "./components/DigitalArea/DigitalArea";
import FormDialog from "../../../shared/components/FormDialog";
import PaymentContext from "../context";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";
import ScreenKeyboard from "../../../shared/components/ScreenKeyboard/ScreenKeyboard";
import AppStatusContext from "../../../shared/states/AppStatus/context";

function PaymentDashboardLeftArea() {
    const {total, paymentTransactions, email, setValidEmail} = useContext(PaymentContext)
    const keyboardContext = useContext(KeyboardContext)
    const {lang, dark} = useContext(AppStatusContext);
    const {t} = useTranslation();


    return (
        <div className={`payment-dashboard-left-area-container ${dark ? 'dark-mode' : ''}`}>
            <div>
                <DigitalArea dark={dark} totalPrice={total} data={paymentTransactions}/>
            </div>
            <div>
                <FormDialog language={lang} disabled={!total || email.length > 0} className="form-dialog"
                            buttonName={t('eInvoice')}
                            func={setValidEmail}
                            label={t('customerEmail')}
                            errorText={t('invalidEmailError')}
                            dark={dark}
                            ScreenKeyboardComponent={ScreenKeyboard}
                            keyboardContext={keyboardContext}
                            dialog={t('contributeToNature')}/>
            </div>
        </div>
    );
}

export default PaymentDashboardLeftArea;