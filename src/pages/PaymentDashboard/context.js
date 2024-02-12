import React from "react";

const PaymentContext = React.createContext(undefined);
const PaymentProvider = ({children, data ={}}) =>{
    const [tempData, setTempData] = React.useState({id: 0, subTotal: 0, total: 0, cart:[]})
    const { total, subTotal, cart } = tempData;
    const [paymentTransactions, setPaymentTransactions] = React.useState([]);
    const amountPaid = paymentTransactions.reduce((total, item) => Math.round((total + item.price) * 100) / 100, 0)
    const amountRemaining = (total-amountPaid)<0?(0):(Math.round((total - amountPaid) * 100) / 100);
    const change = (total-amountPaid)<0?(Math.round((amountPaid - total) * 100) / 100):(0);
    const totalTax = Math.round(cart.reduce((acc, curr) => acc + ((curr.discountedPrice || curr.price) * curr.tax / 100), 0) * 100) / 100

    React.useEffect(() => {
        if (typeof data !== 'undefined' && data !== null && Object.keys(data).length !== 0){
            setTempData(data);
            localStorage.setItem('paymentData', JSON.stringify(data));
        }else{
            const storedData = JSON.parse(localStorage.getItem('paymentData'));
            if (storedData){
                setTempData(storedData);
            }
        }

        const storedTransactions = localStorage.getItem('paymentTransactions');
        if (storedTransactions) {
            setPaymentTransactions(JSON.parse(storedTransactions));
        }
    }, []);

    React.useEffect(() => {
        if (paymentTransactions.length){
            localStorage.setItem('paymentTransactions', JSON.stringify(paymentTransactions));
        }
    }, [paymentTransactions]);


    const setTransaction = (amount, type) => {
        const newTransaction = { price: (Math.floor(amount * 100) / 100), type: type };
        setPaymentTransactions(prevTransactions => [...prevTransactions, newTransaction]);
    };

    const cancelTransaction = ()=>{
        const _amountPaid = amountPaid;
        localStorage.removeItem('paymentData');
        localStorage.removeItem('paymentTransactions');
        setTempData({id: 0, subTotal: 0,total: 0, cart:[]})
        setPaymentTransactions([])
        return _amountPaid;
    }

    const confirmTransaction = ()=>{
        if (!amountRemaining&&paymentTransactions.length&&subTotal){
            const test = {
                date: new Date,
                total: total,
                subTotal: subTotal,
                amountPaid:amountPaid,
                totalTax:totalTax,
                change:change,
                cart: cart,
                transactions:paymentTransactions
            }
            console.log(test);
            return true;
/*            localStorage.removeItem('paymentData');
            localStorage.removeItem('paymentTransactions');
            setTempData({id: 0, subTotal: 0,total: 0, cart:[]})
            setPaymentTransactions([])*/
        }else {
            return false;
        }
    }

    return(
        <PaymentContext.Provider value={{
            total,
            subTotal,
            cart,
            paymentTransactions,
            amountRemaining,
            amountPaid,
            change,
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