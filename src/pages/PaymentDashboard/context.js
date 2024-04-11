import React from "react";
import AppStatusContext from "../../shared/state/AppStatus/context";
import {postTransaction} from "./api";
import {updateStocksFromCart} from "./functions";
import AppDataContext from "../../shared/state/AppData/context";

const PaymentContext = React.createContext(undefined);
const PaymentProvider = ({children}) => {
    const [tempData, setTempData] = React.useState({subTotal: 0, total: 0, cart: [], tax: 0})
    const {total, subTotal, cart, tax} = tempData;
    const [paymentTransactions, setPaymentTransactions] = React.useState([]);
    const amountPaid = paymentTransactions.reduce((total, item) => Math.round((total + item.price) * 100) / 100, 0)
    const amountRemaining = (total - amountPaid) < 0 ? (0) : (Math.round((total - amountPaid) * 100) / 100);
    const change = (total - amountPaid) < 0 ? (Math.round((amountPaid - total) * 100) / 100) : (0);
    const [receipt, setReceipt] = React.useState({})
    const {status} = React.useContext(AppStatusContext);
    const {fetchProducts, clearProducts} = React.useContext(AppDataContext)

    React.useEffect(() => {
        const salesDataString = sessionStorage.getItem('salesData')
        const paymentTransactionsString = sessionStorage.getItem('paymentTransactions')
        if (salesDataString) {
            setTempData(JSON.parse(salesDataString));
        }
        if (paymentTransactionsString) {
            setPaymentTransactions(JSON.parse(paymentTransactionsString))
        }
    }, []);

    React.useEffect(() => {
        if (paymentTransactions.length) {
            sessionStorage.setItem('paymentTransactions', JSON.stringify(paymentTransactions));
        }
    }, [paymentTransactions]);


    const setTransaction = (amount, type) => {
        const newTransaction = {price: (Math.floor(amount * 100) / 100), type: type};
        setPaymentTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    };

    const cancelTransaction = () => {
        const _amountPaid = amountPaid;
        sessionStorage.removeItem('salesData');
        sessionStorage.removeItem('paymentTransactions');
        setTempData({subTotal: 0, total: 0, cart: [], tax: 0})
        return _amountPaid;
    }

    const confirmTransaction = async () => {
        console.log("Starting transaction confirmation process.");
        if (amountRemaining !== 0 || paymentTransactions.length === 0 || subTotal === 0) {
            console.log("Transaction validation failed: amountRemaining, paymentTransactions length, or subTotal is not valid.");
            return false;
        }
    
        let products;
        try {
            products = await fetchProducts();
            console.log("Fetched products for transaction confirmation.");
        } catch (error) {
            console.log("Failed to fetch products.", error);
            return false;
        }
    
        for (const cartItem of cart) {
            const product = products.find(p => p.id === cartItem.id);
            if (!product || product.price !== cartItem.price || product.stock < cartItem.quantity) {
                console.log(`Validation failed for cart item with ID: ${cartItem.id}. Product not found or price/stock mismatch.`);
                return false;
            }
        }
    
        let totalSpent = 0;
        for (const cartItem of cart) {
            const itemTotal = cartItem.discountedPrice !== 0 ? cartItem.discountedPrice * cartItem.quantity : cartItem.price * cartItem.quantity;
            totalSpent += itemTotal;
        }
    
        // Define a tolerance level for floating-point comparisons
        const tolerance = 0.01;
        if (Math.abs(totalSpent - total) > tolerance) {
            console.log(`Total spent (${totalSpent}) does not match amount cart (${total}) within the acceptable tolerance.`);
            return false;
        }
    
        const totalTransactions = paymentTransactions.reduce((total, transaction) => total + transaction.price, 0);
        if (Math.abs(totalTransactions - amountPaid) > tolerance) {
            console.log(`Total transactions (${totalTransactions}) does not match amount paid (${amountPaid}) within the acceptable tolerance.`);
            return false;
        }
    
        const receipt = {
            active: true,
            storeNumber: status.storeNumber,
            case: status.case,
            date: new Date(),
            total: total,
            subTotal: subTotal,
            amountPaid: amountPaid,
            totalTax: tax,
            change: change,
            cart: cart,
            transactions: paymentTransactions,
            refund: ""
        };
    
        try {
            const value = await postTransaction(receipt);
            console.log("Transaction posted successfully.", value.data);
            setReceipt(value.data);
        } catch (reason) {
            console.log("Failed to post transaction.", reason);
            return false;
        }
    
        try {
            await updateStocksFromCart(receipt.cart);
        } catch (error) {
            console.log("Failed to update stocks from cart.", error);
            return false;
        }
    
        clearProducts(true);
        cancelTransaction();
        return true;
    };
    return (
        <PaymentContext.Provider value={{
            total,
            subTotal,
            cart,
            tax,
            paymentTransactions,
            amountRemaining,
            amountPaid,
            change,
            receipt,
            setTransaction,
            cancelTransaction,
            confirmTransaction
        }}>
            {children}
        </PaymentContext.Provider>
    );
}

export default PaymentContext;
export {PaymentProvider};