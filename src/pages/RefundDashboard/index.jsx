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

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});
const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function RefundDashboard({dark = false}) {
    const {receipts} = useContext(AppDataContext);
    const {status} = useContext(AppStatusContext);
    const [receipt, setReceipt] = useState(defaultReceipt)
    const [cart, setCart] = useState(receipt.cart);
    const navigate = useNavigate();
    const [refundedProducts, setRefundedProducts] = useState([])
    const [error, setError] = useState("")


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
        navigate('/', {replace: true, state: {warningMessage: "İade İşlemi İçin Fatura Numarası Zorunludur!"}})
    }, [navigate]);


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
                transactions: [...prevState.transactions, {price: total * (-1), type: "payback"}]
            }

            inactivateReceipt(receiptNumber).then(() => {
                postReceipt(res).then(value => {
                    navigate('/receipt/' + value.data.receiptNumber, {replace: true, state: {receipt: value.data}});
                }).catch(reason => console.log(reason))
            }).catch(reason => console.log(reason))
            return res;
        })
    }

    const handleOnDelete = (product) => {
        setCart(prevState => {
            const productIndex = prevState.findIndex(item => item.id === product.id);
            if (productIndex > -1) {
                const updatedCart = [...prevState];
                updatedCart[productIndex] = {
                    ...updatedCart[productIndex],
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
    const handleOnAdd = (product) => {
        const productQuantity = receipt.cart.filter(item => item.id === product.id)[0].quantity
        setCart(prevState => {
            const productIndex = prevState.findIndex(item => item.id === product.id);
            if (productIndex > -1) {
                const updatedCart = [...prevState];
                updatedCart[productIndex] = {
                    ...updatedCart[productIndex],
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
    const handleOnRemove = (product) => {
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
        })
        setCart(prevState => {
            const productIndex = prevState.findIndex(item => item.id === product.id);
            if (productIndex > -1) {
                const updatedCart = [...prevState];
                updatedCart[productIndex] = {
                    ...updatedCart[productIndex], quantity: 0
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
                setError("Girilen fiş iptal edilmiş!")
                return false;
            }
        } else {
            setError("Fatura numarası geçersiz yada iptal edilmiş")
            return false;
        }
    }

    return (<>
        <ThemeProvider theme={dark ? darkTheme : lightTheme}>
            <FormDialog func={checkReceipt} errorText={error} onClose={onFormDialogClose} label={"Fatura Numarası"}
                        dark={dark} dialog={"Lütfen devam etmeden önce bir fatura numarası girin"}
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
                            onRemove={() => handleOnRemove(product)}
                            onAdd={() => handleOnAdd(product)}
                            onDelete={() => handleOnDelete(product)}/>)}
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
                    <div>Toplam Ödenen Vergi Tutarı: {(receipt.totalTax - tax).toFixed(2)}</div>
                    <div>Ara Topalam Tutarı: {(receipt.subTotal - subTotal).toFixed(2)}</div>
                    <div>Topalam Tutar: {(receipt.total - total).toFixed(2)}</div>
                </div>
                <div>
                    <div>İADE EDİLECEK TUTAR</div>
                    <div style={{color: "green"}}>{total}$</div>
                    <ResponsiveDialog
                        text={"İşlemin onaylanması durumunda iade tutarı nakit veya hediye çeki olarak teslim edilmeli"}
                        title={"İade Tutarı: " + (total + "$")} onConfirm={handleOnApproved}>
                        <Button color="warning" variant="contained" size="small">İadeyi Onayla</Button>
                    </ResponsiveDialog>
                </div>
                <div>
                    <div>Toplam Geri Ödenecek Vergi Tutarı: {tax}</div>
                    <div>İade Ara Toplamı: {subTotal}</div>
                    <div>İade Topalam Tutar: {total}</div>
                </div>
            </div>
        </ThemeProvider>
    </>);
}

export default RefundDashboard;