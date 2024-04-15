import {useCallback, useContext, useMemo, useState} from "react";
import AppDataContext from "../../shared/state/AppData/context";
import {defaultReceipt} from "../../shared/state/AppData/defaultData";
import {useNavigate} from "react-router-dom";
import {calculateTaxAmount} from "../SalesDashboard/functions/productProcessing";
import {inactivateReceipt, postReceipt} from "./api";

export const useRefundDashboard = (status,cashier,t) => {
    const {receipts} = useContext(AppDataContext);
    const [receipt, setReceipt] = useState(defaultReceipt)
    const [cart, setCart] = useState(receipt.cart);
    const navigate = useNavigate();
    const [refundedProducts, setRefundedProducts] = useState([])
    const [error, setError] = useState("")

    const [loading, setLoading] = useState(false); // Add this line to track loading state

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
        setLoading(true);
        const {receiptNumber, ...rest} = receipt;
        const res = {
            ...rest,
            active: true,
            storeNumber: status.storeNumber,
            case: status.case,
            cashierName: cashier.cashierName,
            cashierNumber: cashier.cashierNumber,
            cart: cart.filter(item => item.quantity),
            change: Math.round((total + receipt.change) * 100) / 100,
            total: Math.round((receipt.total - total) * 100) / 100,
            subTotal: Math.round((receipt.subTotal - subTotal) * 100) / 100,
            totalTax: Math.round((receipt.totalTax - tax) * 100) / 100,
            date: new Date(),
            transactions: [...receipt.transactions, {price: total * (-1), type: "payback"}],
            refund: receiptNumber,
            email: receipt.email
        };
    
        inactivateReceipt(receiptNumber).then(() => {
            postReceipt(res).then(value => {
                navigate('/receipt/' + value.data.receiptNumber, {replace: true, state: {receipt: value.data}});
                setLoading(false);
            }).catch(reason => {
                console.error(reason);
                setLoading(false);
            });
        }).catch(reason => {
            console.error(reason);
            setLoading(false);
        });
    };

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

    return {
        receipt,
        cart,
        refundedProducts,
        error,
        loading,
        total,
        subTotal,
        tax,
        onFormDialogClose,
        handleOnApproved,
        handleOnDelete,
        handleOnAdd,
        handleOnRemove,
        checkReceipt
    }
}