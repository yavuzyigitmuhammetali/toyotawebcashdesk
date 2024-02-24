import React from "react";
import DataFetchingContext from "../../shared/state/context";
import {postTransaction} from "./api";

const PaymentContext = React.createContext(undefined);
const PaymentProvider = ({children}) => {
    const [tempData, setTempData] = React.useState({subTotal: 0, total: 0, cart: []})
    const {total, subTotal, cart} = tempData;
    const [paymentTransactions, setPaymentTransactions] = React.useState([]);
    const amountPaid = paymentTransactions.reduce((total, item) => Math.round((total + item.price) * 100) / 100, 0)
    const amountRemaining = (total - amountPaid) < 0 ? (0) : (Math.round((total - amountPaid) * 100) / 100);
    const change = (total - amountPaid) < 0 ? (Math.round((amountPaid - total) * 100) / 100) : (0);
    const totalTax = Math.round(cart.reduce((acc, curr) => acc + ((curr.discountedPrice || curr.price) * curr.tax / 100), 0) * 100) / 100
    const [receipt,setReceipt] = React.useState({})
    const {status} = React.useContext(DataFetchingContext);

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
        setTempData({id: 0, subTotal: 0, total: 0, cart: []})
        return _amountPaid;
    }

    const confirmTransaction = () => {
        if (!amountRemaining && paymentTransactions.length && subTotal) {
            const test = {
                active: true,
                storeNumber: status.storeNumber,
                case: status.case,
                date: new Date(),
                total: total,
                subTotal: subTotal,
                amountPaid: amountPaid,
                totalTax: totalTax,
                change: change,
                cart: cart,
                transactions: paymentTransactions
            };
            return postTransaction(test)
                .then(value => {
                    setReceipt(value.data);
                    cancelTransaction();
                    return true;
                })
                .catch(reason => {
                    console.log(reason);
                    return false;
                });
        } else {
            return false;
        }
    };


    return (
        <PaymentContext.Provider value={{
            total,
            subTotal,
            cart,
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