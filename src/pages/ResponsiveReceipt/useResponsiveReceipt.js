import {useCallback, useContext, useEffect, useState} from "react";
import AppDataContext from "../../shared/states/AppData/context";
import {useLocation, useParams} from "react-router-dom";
import {defaultReceipt} from "../../shared/states/AppData/defaultData";

export const useResponsiveReceipt = (printErrorMessage) => {
    const {receipts} = useContext(AppDataContext);
    const location = useLocation();
    const [receipt, setReceipt] = useState({})
    const [alignment, setAlignment] = useState('left');
    const [alignment2, setAlignment2] = useState('left');
    const {receiptNumber} = useParams();
    const [isPrinting, setIsPrinting] = useState(false);

    useEffect(() => {
        const filteredReceipt = receipts.find(item => item.receiptNumber === receiptNumber);
        setReceipt(location.state?.receipt ?? filteredReceipt ?? defaultReceipt);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiptNumber, receipts]);


    const handlePrint = useCallback(async () => {
        if (receipt.active) {
            setIsPrinting(true);
            await window.print();
            setIsPrinting(false);
        } else {
            alert(printErrorMessage);
        }
    }, [printErrorMessage, receipt.active]);


    useEffect(() => {
        if (location.pathname === "/receipt/print-test") {
            window.print();
        }
    }, [location.pathname])

    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };
    const handleAlignment2 = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment2(newAlignment);
        }
    };


    return {
        receipt,
        alignment,
        alignment2,
        handlePrint,
        handleAlignment,
        handleAlignment2,
        isPrinting
    }
}