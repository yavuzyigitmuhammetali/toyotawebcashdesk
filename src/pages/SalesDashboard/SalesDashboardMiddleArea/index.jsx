import React, {useCallback, useContext, useEffect, useState} from 'react';
import "./index.css"
import ShoppingCartItem from "../../../shared/components/ShoppingCartItem/ShoppingCartItem";
import CartContext from "../context";
import KeyboardContext from "../../../shared/components/ScreenKeyboard/context";
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../../shared/states/AppStatus/context";

function SalesDashboardMiddleArea() {
    const {dark, lang, performanceMode, colorOptions} = useContext(AppStatusContext);
    const {
        handleElementFocus, value: keyboardValue, onChangeValue
    } = useContext(KeyboardContext);

    const {t} = useTranslation();

    const [decimalValue, setDecimalValue] = useState({value: "", id: 0})
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
        setDecimalValue({value: value, id: parseInt(id)})
    }, [onChangeValue]);

    useEffect(() => {
        increaseQuantityDecimalByIndex(decimalValue.id, keyboardValue[decimalValue.id.toString()]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decimalValue, keyboardValue]);

    return (
        <div className={`sales-dashboard-middle-area-container`}>
            <div className={`sales-dashboard-middle-area-products-scroll`}>
                <div className="sales-dashboard-middle-area-products">
                    {cart.map((item, key) => (
                        <ShoppingCartItem
                            color={colorOptions.cartItem.salesDashboardMiddle ?? colorOptions.cartItem.default}
                            performanceMode={performanceMode}
                            lang={lang}
                            onAdd={() => increaseQuantityByIndex(key)}
                            onDelete={() => decreaseQuantityByIndex(key)}
                            onRemove={() => removeFromCartByIndex(key)}
                            key={key} dark={dark}
                            campaign={item.campaign.toUpperCase()}
                            discountedPrice={item.discountedPrice}
                            price={item.price} index={key + 1} barcode={item.barcode}
                            tax={item.tax}
                            quantity={item.quantity} productName={item.name}
                            fraction={item.fraction}
                            decimalValue={keyboardValue[key] ?? ''}
                            onFocus={(event) => setDecimalValue(prevState => ({
                                ...prevState, id: parseInt(handleElementFocus(event))
                            }))} id={key.toString()}
                            onChangeDecimal={onShoppingCartItemChangeDecimal}
                        />
                    ))}
                </div>
            </div>
            <div className={`sales-dashboard-middle-area-texts `}>
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

export default SalesDashboardMiddleArea;
