import React, {useContext} from 'react';
import "./index.css"
import ShoppingCartItem from "../../shared/components/ShoppingCartItem/ShoppingCartItem";
import {Button, CircularProgress} from "@mui/material";
import ResponsiveDialog from "../../shared/components/ResponsiveDialog";
import FormDialog from "../../shared/components/FormDialog";
import ScreenKeyboard from "../../shared/components/ScreenKeyboard/ScreenKeyboard";
import {useRefundDashboard} from "./useRefundDashboard";
import KeyboardContext from "../../shared/components/ScreenKeyboard/context";
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../shared/states/AppStatus/context";

function RefundDashboard() {
    const keyboardContext = useContext(KeyboardContext);
    const {t} = useTranslation();
    const {status, lang, dark, cashier, performanceMode} = useContext(AppStatusContext);
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
    } = useRefundDashboard(status, cashier, t);


    return (
        <>
            <FormDialog
                className="refund-amount-dialog"
                language={lang}
                ScreenKeyboardComponent={ScreenKeyboard}
                keyboardContext={keyboardContext}
                func={checkReceipt}
                errorText={error}
                onClose={onFormDialogClose}
                label={t('refundReceiptNumber')}
                dark={dark}
                dialog={t('pleaseEnterReceiptNumber')}
                openManual={1}
            />
            <div className={"refund-dashboard-upper-area-container"}>
                <div className={"refund-dashboard-upper-area-item"}>
                    <div className={"refund-dashboard-upper-area-scroll"}>
                        {cart.map((product, key) => (
                            <ShoppingCartItem
                                performanceMode={performanceMode}
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
                                onDelete={() => handleOnDelete(product, key)}
                                lang={lang}
                            />
                        ))}
                    </div>
                </div>
                <div className={"refund-dashboard-upper-area-item"}>
                    <div className={"refund-dashboard-upper-area-scroll"}>
                        {refundedProducts.map((product, key) => (
                            <ShoppingCartItem
                                performanceMode={performanceMode}
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
                                productName={product.name}
                                lang={lang}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={"refund-dashboard-lower-area-container"}>
                <div>
                    <div>{t('totalTaxPaid')}: {(receipt.totalTax - tax).toFixed(2)}</div>
                    <div>{t('subtotalAmount')}: {(receipt.subTotal - subTotal).toFixed(2)}</div>
                    <div>{t('totalAmount')}: {(receipt.total - total).toFixed(2)}</div>
                </div>
                <div>
                    <div>{t('refundAmountUppercase')}</div>
                    <div className="refund-amount-color">{total}$</div>
                    <ResponsiveDialog
                        language={lang}
                        text={t('refundApprovalMessage')}
                        title={t('refundAmount') + ": " + total + "$"}
                        onConfirm={handleOnApproved}
                    >
                        <Button
                            color="warning"
                            variant="contained"
                            size="small"
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={24}/> : null}
                        >
                            {t('approveRefund')}
                        </Button>
                    </ResponsiveDialog>
                </div>
                <div>
                    <div>{t('totalTaxRefunded')}: {tax.toFixed(2)}</div>
                    <div>{t('refundSubtotal')}: {subTotal.toFixed(2)}</div>
                    <div>{t('refundTotal')}: {total.toFixed(2)}</div>
                </div>
            </div>
        </>
    );
}

export default RefundDashboard;
