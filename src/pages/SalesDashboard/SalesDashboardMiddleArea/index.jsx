import React, {useCallback, useContext, useMemo} from 'react';
import "./index.css"
import ShoppingCartItem from "../../../shared/components/ShoppingCartItem/ShoppingCartItem";
import CartContext from "../context";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../../shared/states/AppStatus/context";

function SalesDashboardMiddleArea() {
    const {dark, lang, performanceMode, colorOptions} = useContext(AppStatusContext);
    const {
        handleElementFocus,
        value: keyboardValue,
        onChangeValue
    } = useContext(KeyboardContext);

    const {t} = useTranslation();

    const {
        cart,
        decreaseQuantityByIndex,
        increaseQuantityByIndex,
        removeFromCartByIndex,
        increaseQuantityDecimalByIndex,
        total: totalPrice,
        subTotal: subTotalPrice
    } = useContext(CartContext);

    const onShoppingCartItemChangeDecimal = useCallback((event) => {
        onChangeValue(event);
        const {id, value} = event.target;
        increaseQuantityDecimalByIndex(parseInt(id), value);
    }, [onChangeValue, increaseQuantityDecimalByIndex]);

    const handleFocus = useCallback((event) => {
        handleElementFocus(event);
    }, [handleElementFocus]);


    const cartItems = useMemo(() => cart.map((item, key) => (
        <ShoppingCartItem
            key={key}
            color={colorOptions.cartItem.salesDashboardMiddle ?? colorOptions.cartItem.default}
            performanceMode={performanceMode}
            lang={lang}
            onAdd={() => increaseQuantityByIndex(key)}
            onDelete={() => decreaseQuantityByIndex(key)}
            onRemove={() => removeFromCartByIndex(key)}
            dark={dark}
            campaign={item.campaign.toUpperCase()}
            discountedPrice={item.discountedPrice}
            price={item.price}
            index={key + 1}
            barcode={item.barcode}
            tax={item.tax}
            quantity={item.quantity}
            productName={item.name}
            fraction={item.fraction}
            decimalValue={keyboardValue[key] ?? ''}
            onFocus={handleFocus}
            id={key.toString()}
            onChangeDecimal={onShoppingCartItemChangeDecimal}
        />
        // eslint-disable-next-line
    )), [cart, colorOptions.cartItem, performanceMode, lang, dark, keyboardValue]);

    return (
        <div className="sales-dashboard-middle-area-container">
            <div className="sales-dashboard-middle-area-products-scroll">
                <div className="sales-dashboard-middle-area-products">
                    {cartItems}
                </div>
            </div>
            <div className="sales-dashboard-middle-area-texts">
                <div className="sales-dashboard-middle-area-amount">
                    <span>{t('subTotal')}: </span>
                    <span>{subTotalPrice.toFixed(2)}$</span>
                </div>
                <hr/>
                <div className="sales-dashboard-middle-area-amount">
                    <span>{t('totalAmount')}: </span>
                    <span>{totalPrice.toFixed(2)}$</span>
                </div>
            </div>
        </div>
    );
}

export default React.memo(SalesDashboardMiddleArea);