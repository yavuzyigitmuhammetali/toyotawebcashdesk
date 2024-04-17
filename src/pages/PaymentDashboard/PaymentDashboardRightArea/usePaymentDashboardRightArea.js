import {useCallback, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import PaymentContext from "../context";
import NumericKeyboardContext from "../../../shared/components/NumericKeyboard/context";

export const usePaymentDashboardRightArea = (successMessage) => {
    const navigate = useNavigate();
    const [paymentDialog, setPaymentDialog] = useState(0)
    const {
        setTransaction,
        amountRemaining,
        amountPaid,
        cancelTransaction,
        confirmTransaction,
        receipt
    } = useContext(PaymentContext)
    const {data: numericKeyboardData, setData: setNumericKeyboardData} = useContext(NumericKeyboardContext)
    const [paymentMethod, setPaymentMethod] = useState("cash")

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (numericKeyboardData) {
            setPaymentDialog(prevState => prevState + 1);
        }
    }, [numericKeyboardData]);

    useEffect(() => {
        if (Object.values(receipt).length !== 0) {
            navigate('/receipt/' + receipt.receiptNumber, {
                replace: true,
                state: {receipt: receipt, successMessage: successMessage}
            });
        }
    }, [receipt]);
    const onResponsiveDialogConfirm = useCallback(() => {
        if (paymentMethod === "card") {
            setTransaction(amountRemaining, "card");
            setNumericKeyboardData(0);
            setPaymentMethod("cash")
        } else {
            setTransaction(numericKeyboardData, paymentMethod);
            setNumericKeyboardData(0);
        }
    }, [setTransaction, numericKeyboardData, paymentMethod, setNumericKeyboardData, amountRemaining]);

    useEffect(() => {
        if (paymentMethod === "card") {
            setPaymentDialog(prevState => prevState + 1);
        }
    }, [paymentMethod]);

    const handleConfirmTransaction = async () => {
        setIsLoading(true);
        await confirmTransaction();
        setIsLoading(false);
    };


    return {
        paymentDialog,
        amountRemaining,
        amountPaid,
        cancelTransaction,
        paymentMethod,
        setPaymentMethod,
        isLoading,
        onResponsiveDialogConfirm,
        handleConfirmTransaction
    };
}