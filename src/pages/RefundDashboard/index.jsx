import React, {useContext} from 'react';
import "./refundDashboard.css"
import ShoppingCartItem from "../../shared/components/ShoppingCartItem/ShoppingCartItem";
import {Button, CircularProgress} from "@mui/material";
import ResponsiveDialog from "../../shared/components/ResponsiveDialog";
import FormDialog from "../../shared/components/FormDialog";
import ScreenKeyboard from "../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {useRefundDashboard} from "./useRefundDashboard";
import KeyboardContext from "../../shared/components/ScreenKeyboard/context";
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../shared/state/AppStatus/context";


function RefundDashboard() {
    const keyboardContext = useContext(KeyboardContext)
    const {t} = useTranslation();
    const {status, lang, dark,cashier} = useContext(AppStatusContext);
    const {
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
    } = useRefundDashboard(status,cashier, t)

    return (<>
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
                    <Button color="warning" variant="contained" size="small" disabled={loading}
                            startIcon={loading ? <CircularProgress size={24}/> : null}>
                        {t('approveRefund')}
                    </Button>
                </ResponsiveDialog>
            </div>
            <div>
                <div>{t('totalTaxRefunded')}: {tax}</div>
                <div>{t('refundSubtotal')}: {subTotal}</div>
                <div>{t('refundTotal')}: {total}</div>
            </div>
        </div>
    </>);
}

export default RefundDashboard;