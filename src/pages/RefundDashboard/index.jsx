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

function RefundDashboard({performanceMode = true}) {
    const keyboardContext = useContext(KeyboardContext);
    const {t} = useTranslation();
    const {status, lang, dark, cashier} = useContext(AppStatusContext);
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

    const upperAreaContainerClass = dark ? "refund-dashboard-upper-area-container refund-dashboard-dark" : "refund-dashboard-upper-area-container refund-dashboard-light";
    const upperAreaItemClass = dark ? "refund-dashboard-upper-area-item refund-dashboard-upper-area-item-dark" : "refund-dashboard-upper-area-item refund-dashboard-upper-area-item-light";
    const upperAreaScrollClass = dark ? "refund-dashboard-upper-area-scroll refund-dashboard-upper-area-scroll-dark" : "refund-dashboard-upper-area-scroll refund-dashboard-upper-area-scroll-light";
    const lowerAreaContainerClass = dark ? "refund-dashboard-lower-area-container refund-dashboard-lower-area-container-dark" : "refund-dashboard-lower-area-container refund-dashboard-lower-area-container-light";

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
            <div className={upperAreaContainerClass}>
                <div className={upperAreaItemClass}>
                    <div className={upperAreaScrollClass}>
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
                <div className={upperAreaItemClass}>
                    <div className={upperAreaScrollClass}>
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
            <div className={lowerAreaContainerClass}>
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
