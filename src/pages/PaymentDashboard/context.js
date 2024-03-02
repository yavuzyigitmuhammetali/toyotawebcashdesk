import React from "react";
import AppStatusContext from "../../shared/state/AppStatus/context";
import {postTransaction} from "./api";
import {updateStocksFromCart} from "./functions";

const PaymentContext = React.createContext(undefined);
const PaymentProvider = ({children}) => {
    const [tempData, setTempData] = React.useState({subTotal: 0, total: 0, cart: [],tax:0})
    const {total, subTotal, cart,tax} = tempData;
    const [paymentTransactions, setPaymentTransactions] = React.useState([]);
    const amountPaid = paymentTransactions.reduce((total, item) => Math.round((total + item.price) * 100) / 100, 0)
    const amountRemaining = (total - amountPaid) < 0 ? (0) : (Math.round((total - amountPaid) * 100) / 100);
    const change = (total - amountPaid) < 0 ? (Math.round((amountPaid - total) * 100) / 100) : (0);
    const [receipt,setReceipt] = React.useState({})
    const {status} = React.useContext(AppStatusContext);

    React.useEffect(() => {
        const salesDataString = localStorage.getItem('salesData')
        const paymentTransactionsString = localStorage.getItem('paymentTransactions')
        if (salesDataString){
            setTempData(JSON.parse(salesDataString));
        }
        if (paymentTransactionsString){
            setPaymentTransactions(JSON.parse(paymentTransactionsString))
        }
    }, []);

    React.useEffect(() => {
        if (paymentTransactions.length) {
            localStorage.setItem('paymentTransactions', JSON.stringify(paymentTransactions));
        }
    }, [paymentTransactions]);


    const setTransaction = (amount, type) => {
        const newTransaction = {price: (Math.floor(amount * 100) / 100), type: type};
        setPaymentTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    };

    const cancelTransaction = () => {
        const _amountPaid = amountPaid;
        localStorage.removeItem('salesData');
        localStorage.removeItem('paymentTransactions');
        setTempData({ subTotal: 0, total: 0, cart: [],tax:0})
        return _amountPaid;
    }

    const confirmTransaction = async () => {
        if (!amountRemaining && paymentTransactions.length && subTotal) {
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
                transactions: paymentTransactions
            };

            try {
                const value = await postTransaction(receipt);
                setReceipt(value.data);
                cancelTransaction();
                await updateStocksFromCart(value.data.cart);
                return true;
            } catch (reason) {
                console.log(reason);
                return false;
            }
        } else {
            return false;
        }
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