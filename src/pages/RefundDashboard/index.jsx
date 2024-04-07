import React, {useCallback, useContext, useMemo, useState} from 'react';
import "./refundDashboard.css"
import ShoppingCartItem from "../../shared/components/ShoppingCartItem/ShoppingCartItem";
import {Button} from "@mui/material";
import ResponsiveDialog from "../../shared/components/ResponsiveDialog";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import FormDialog from "../../shared/components/FormDialog";
import {defaultReceipt} from "../../shared/state/AppData/defaultData";
import {useNavigate} from "react-router-dom";
import AppDataContext from "../../shared/state/AppData/context";
import {inactivateReceipt, postReceipt} from "./api";
import AppStatusContext from "../../shared/state/AppStatus/context";
import {calculateTaxAmount} from "../SalesDashboard/functions/productProcessing";
import KeyboardContext from "../../shared/components/ScreenKeyboard/context";
import ScreenKeyboard from "../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {useTranslation} from 'react-i18next';


function RefundDashboard() {
    const {receipts} = useContext(AppDataContext);
    const {status, lang, dark} = useContext(AppStatusContext);
    const keyboardContext = useContext(KeyboardContext)
    const [receipt, setReceipt] = useState(defaultReceipt)
    const [cart, setCart] = useState(receipt.cart);
    const navigate = useNavigate();
    const [refundedProducts, setRefundedProducts] = useState([])
    const [error, setError] = useState("")
    const {t} = useTranslation();

    const {total, subTotal, tax} = useMemo(() => {
        const total = refundedProducts.reduce((acc, {
            discountedPrice, price, quantity
        }) => acc + ((discountedPrice > 0 ? discountedPrice : price) * quantity), 0);
        const roundedTotal = Math.round(total * 100) / 100;

        const subTotal = refundedProducts.reduce((acc, {price, quantity}) => acc + (price * quantity), 0);
        const roundedSubTotal = Math.round(subTotal * 100) / 100;

        const tax = refundedProducts.reduce((acc, {
            discountedPrice, price, quantity, tax
        }) => acc + calculateTaxAmount((discountedPrice > 0 ? discountedPrice : price), tax) * quantity, 0);
        const roundedTax = Math.round(tax * 100) / 100;

        return {subTotal: roundedSubTotal, tax: roundedTax, total: roundedTotal};
    }, [refundedProducts]);


    const onFormDialogClose = useCallback(() => {
        navigate('/', {replace: true, state: {warningMessage: t('refundReceiptRequired')}})
    }, [navigate, t]);


    const handleOnApproved = () => {
        setReceipt(prevState => {
            const {receiptNumber, ...rest} = prevState;
            const res = {
                ...rest,
                active: true,
                storeNumber: status.storeNumber,
                case: status.case,
                cart: cart.filter(item => item.quantity),
                change: Math.round((total + prevState.change) * 100) / 100,
                total: Math.round((prevState.total - total) * 100) / 100,
                subTotal: Math.round((prevState.subTotal - subTotal) * 100) / 100,
                totalTax: Math.round((prevState.totalTax - tax) * 100) / 100,
                date: new Date(),
                transactions: [...prevState.transactions, {price: total * (-1), type: "payback"}],
                refund: receiptNumber
            }

            inactivateReceipt(receiptNumber).then(() => {
                postReceipt(res).then(value => {
                    navigate('/receipt/' + value.data.receiptNumber, {replace: true, state: {receipt: value.data}});
                }).catch(reason => console.log(reason))
            }).catch(reason => console.log(reason))
            return res;
        })
    }

    const handleOnDelete = (product, index) => {
        setCart(prevState => {
            if (index > -1) {
                const updatedCart = [...prevState];
                updatedCart[index] = {
                    ...updatedCart[index],
                    quantity: (product.quantity) > 0 ? (product.quantity - 1) : (product.quantity)
                };
                return updatedCart;
            } else {
                return prevState;
            }
        })
        setRefundedProducts(prevState => {
            const productIndex = prevState.findIndex(item => item.id === product.id);
            if (productIndex > -1) {
                const updatedCart = [...prevState];
                updatedCart[productIndex] = {
                    ...updatedCart[productIndex],
                    quantity: (product.quantity > 0) ? (updatedCart[productIndex].quantity + 1) : (updatedCart[productIndex].quantity)
                };
                return updatedCart;
            } else {
                return [...prevState, {...product, quantity: 1}];
            }
        })
    }
    const handleOnAdd = (product, index) => {
        const productQuantity = receipt.cart[index].quantity
        setCart(prevState => {
            if (index > -1) {
                const updatedCart = [...prevState];
                updatedCart[index] = {
                    ...updatedCart[index],
                    quantity: (productQuantity > product.quantity) ? (product.quantity + 1) : (product.quantity)
                };
                return updatedCart;
            } else {
                return prevState;
            }
        })
        setRefundedProducts(prevState => {
            const productIndex = prevState.findIndex(item => item.id === product.id);
            if (productIndex > -1) {
                const updatedProduct = {...prevState[productIndex]};
                updatedProduct.quantity -= 1;

                if (updatedProduct.quantity > 0) {
                    const updatedCart = [...prevState];
                    updatedCart[productIndex] = updatedProduct;
                    return updatedCart;
                } else {
                    return prevState.filter((_, index) => index !== productIndex);
                }
            } else {
                return prevState;
            }
        });
    }
    const handleOnRemove = (product, index) => {
        setRefundedProducts(prevState => {
                const productIndex = prevState.findIndex(item => item.id === product.id);
                if (productIndex > -1) {
                    const updatedCart = [...prevState];
                    updatedCart[productIndex] = {
                        ...updatedCart[productIndex], quantity: product.quantity + updatedCart[productIndex].quantity
                    };
                    return updatedCart;
                } else {
                    return [...prevState, {...product, quantity: product.quantity}];
                }
            }
        )
        setCart(prevState => {
            if (index > -1) {
                const updatedCart = [...prevState];
                updatedCart[index] = {
                    ...updatedCart[index], quantity: 0
                };
                return updatedCart;
            } else {
                return prevState;
            }
        })
    }

    const checkReceipt = (value) => {
        const filteredReceipts = receipts.filter(receipt => receipt.receiptNumber === value);
        if (filteredReceipts.length) {
            const filteredReceipt = filteredReceipts.filter(receipt => receipt.active)[0];
            if (filteredReceipt) {
                setReceipt(filteredReceipt)
                setCart(filteredReceipt.cart)
                setError("");
                return true
            } else {
                setError(t('canceledReceipt'))
                return false;
            }
        } else {
            setError(t('invalidReceiptNumber'))
            return false;
        }
    }

    return (<>
        <ThemeProvider theme={createTheme({palette: {mode: dark ? "dark" : "light"}})}>
            <FormDialog language={lang} ScreenKeyboardComponent={ScreenKeyboard} keyboardContext={keyboardContext}
                        func={checkReceipt} errorText={error} onClose={onFormDialogClose}
                        label={t('refundReceiptNumber')}
                        dark={dark} dialog={t('pleaseEnterReceiptNumber')}
                        openManual={1}> </FormDialog>
            <div style={{color: dark ? "white" : "black"}} className="refund-dashboard-upper-area-container">
                <div style={{backgroundColor: dark ? "#121418" : "#F8FAFB"}}
                     className="refund-dashboard-upper-area-item">
                    <div style={{backgroundColor: dark ? "#131922" : "white"}}
                         className="refund-dashboard-upper-area-scroll">
                        {cart.map((product, key) => <ShoppingCartItem
                            dark={dark}
                            key={key}
                            price={product.price}
                            discountedPrice={product.discountedPrice ? product.discountedPrice : ""}
                            tax={product.tax}
                            quantity={product.quantity}
                            campaign={product.campaign}
                            barcode={product.barcode}
                            index={key + 1}
                            productName={product.name}
                            fraction={product.fraction}
                            decimalValue={0}
                            onRemove={() => handleOnRemove(product, key)}
                            onAdd={() => handleOnAdd(product, key)}
                            onDelete={() => handleOnDelete(product, key)}/>)}
                    </div>
                </div>
                <div style={{backgroundColor: dark ? "#121418" : "#F8FAFB"}}
                     className="refund-dashboard-upper-area-item">
                    <div style={{backgroundColor: dark ? "#131922" : "white"}}
                         className="refund-dashboard-upper-area-scroll">
                        {refundedProducts.map((product, key) => <ShoppingCartItem
                            disabled
                            dark={dark}
                            key={key}
                            price={product.price}
                            discountedPrice={product.discountedPrice ? product.discountedPrice : ""}
                            tax={product.tax}
                            quantity={product.quantity}
                            campaign={product.campaign}
                            barcode={product.barcode}
                            index={key + 1}
                            productName={product.name}/>)}
                    </div>
                </div>
            </div>
            <div style={{backgroundColor: dark ? "#121418" : "#F8FAFB", color: dark ? "white" : "black"}}
                 className="refund-dashboard-lower-area-container">
                <div>
                    <div>{t('totalTaxPaid')}: {(receipt.totalTax - tax).toFixed(2)}</div>
                    <div>{t('subtotalAmount')}: {(receipt.subTotal - subTotal).toFixed(2)}</div>
                    <div>{t('totalAmount')}: {(receipt.total - total).toFixed(2)}</div>
                </div>
                <div>
                    <div>{t('refundAmountUppercase')}</div>
                    <div style={{color: "green"}}>{total}$</div>
                    <ResponsiveDialog
                        language={lang}
                        text={t('refundApprovalMessage')}
                        title={t('refundAmount') + ": " + (total + "$")} onConfirm={handleOnApproved}>
                        <Button color="warning" variant="contained" size="small">{t('approveRefund')}</Button>
                    </ResponsiveDialog>
                </div>
                <div>
                    <div>{t('totalTaxRefunded')}: {tax}</div>
                    <div>{t('refundSubtotal')}: {subTotal}</div>
                    <div>{t('refundTotal')}: {total}</div>
                </div>
            </div>
        </ThemeProvider>
    </>);
}

export default RefundDashboard;