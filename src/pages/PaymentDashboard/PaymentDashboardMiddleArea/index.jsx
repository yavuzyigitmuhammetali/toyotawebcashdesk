import React, {useContext} from 'react';
import "./paymentDashboardMiddleArea.css"
import ShoppingCartItem
    from "../../../shared/components/ShoppingCartItem/ShoppingCartItem";
import PaymentContext from "../context";
import { useTranslation } from 'react-i18next';

function PaymentDashboardMiddleArea({dark = false}) {
    const {total, subTotal, cart} = useContext(PaymentContext)
    const { t } = useTranslation();
    return (
        <div style={dark ? {backgroundColor: "#121418", borderColor: "white"} : {}} className="payment-dashboard-middle-area-container">
            <div style={{borderColor: dark? "white":"", backgroundColor: dark ? "#111923" : "white"}} className="payment-dashboard-middle-area-products-scroll">
                <div className="payment-dashboard-middle-area-products">
                    {cart.map((item, key) =>
                        <ShoppingCartItem
                                          disabled
                                          key={key} dark={dark}
                                          campaign={item.campaign.toUpperCase()}
                                          discountedPrice={item.discountedPrice}
                                          price={item.price} index={key + 1} barcode={item.barcode} tax={item.tax}
                                          quantity={item.quantity} productName={item.name}/>
                    )}
                </div>
            </div>
            <div style={dark ? {backgroundColor: "black", color: "white", borderColor: "white"} : {}}
                 className="payment-dashboard-middle-area-texts">
                <div className="payment-dashboard-middle-area-amount">
                    <span>{t('subTotal')} </span>
                    <span>{subTotal.toFixed(2)}</span>
                </div>
                <hr style={{borderColor: "Background"}}/>
                <div className="payment-dashboard-middle-area-amount">
                    <span>{t('totalAmount')}</span>
                    <span>{total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}

export default PaymentDashboardMiddleArea;