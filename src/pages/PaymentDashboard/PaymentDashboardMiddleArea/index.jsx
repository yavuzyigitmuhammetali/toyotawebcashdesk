import React, {useContext} from 'react';
import "./index.css"
import ShoppingCartItem from "../../../shared/components/ShoppingCartItem/ShoppingCartItem";
import PaymentContext from "../context";
import {useTranslation} from 'react-i18next';
import AppStatusContext from "../../../shared/states/AppStatus/context";

const PaymentDashboardMiddleArea = React.memo(() => {
    const {dark, lang, performanceMode, colorOptions} = useContext(AppStatusContext);
    const {total, subTotal, cart} = useContext(PaymentContext)
    const {t} = useTranslation();
    return (
        <div className={`payment-dashboard-middle-area-container `}>
            <div className={`payment-dashboard-middle-area-products-scroll`}>
                <div className="payment-dashboard-middle-area-products">
                    {cart.map((item, key) =>
                        <ShoppingCartItem
                            color={colorOptions.cartItem.paymentDashboardMiddle ?? colorOptions.cartItem.default}
                            performanceMode={performanceMode}
                            disabled
                            key={key} dark={dark}
                            campaign={item.campaign.toUpperCase()}
                            discountedPrice={item.discountedPrice}
                            price={item.price} index={key + 1} barcode={item.barcode} tax={item.tax}
                            quantity={item.quantity} productName={item.name} lang={lang}/>
                    )}
                </div>
            </div>
            <div className={`payment-dashboard-middle-area-texts `}>
                <div className="payment-dashboard-middle-area-amount">
                    <span>{t('subTotal')}: </span>
                    <span>{subTotal.toFixed(2)}$</span>
                </div>
                <hr className="payment-dashboard-middle-area-hr"/>
                <div className="payment-dashboard-middle-area-amount">
                    <span>{t('totalAmount')}: </span>
                    <span>{total.toFixed(2)}$</span>
                </div>
            </div>
        </div>
    );
})

export default PaymentDashboardMiddleArea;