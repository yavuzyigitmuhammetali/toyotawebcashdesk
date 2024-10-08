import React, {useCallback, useContext, useState} from 'react';
import "./index.css";
import {Button, IconButton} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import NumericKeyboard from "../../../shared/components/NumericKeyboard/NumericKeyboard";
import CartContext from "../context";
import FormDialog from "../../../shared/components/FormDialog";
import {checkIdentityNumber} from "../functions/studentValidate";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ProductShowcase from "../../../shared/components/ProductShowcase/ProductShowcase";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {useNavigate} from "react-router-dom";
import ResponsiveDialog from "../../../shared/components/ResponsiveDialog";
import KeyboardContext from '../../../shared/components/ScreenKeyboard/context';
import ScreenKeyboard from '../../../shared/components/ScreenKeyboard/ScreenKeyboard';
import {useTranslation} from "react-i18next";
import AppStatusContext from "../../../shared/states/AppStatus/context";

const SalesDashboardRightArea = React.memo(() => {
    const {lang, dark, performanceMode, colorOptions} = useContext(AppStatusContext);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const keyboardContext = useContext(KeyboardContext);
    const {
        discounts,
        toggleDiscounts,
        products,
        addToCart,
        cancelTransaction,
        cart,
        confirmCart
    } = useContext(CartContext);
    const [campaignsWindow, setCampaignsWindow] = useState({first: false, other: true});
    const [productShowcaseWindow, setProductShowcaseWindow] = useState(false);

    const handleConfirmCart = useCallback(() => {
        if (confirmCart()) {
            navigate('/order/payment', {replace: true});
        } else {
            navigate('/', {replace: true, state: {errorMessage: t('errorAddingProductToCart')}})
        }
    }, [confirmCart, navigate, t]);

    const handleStudentTaxFree = (val) => {
        if (checkIdentityNumber(val)) {
            toggleDiscounts("studentTaxFree");
            return true;
        } else {
            return false;
        }
    };

    return (
        <div
            className={`sales-dashboard-right-area-container ${performanceMode ? 'performance-mode' : ''}`}
        >
            <div className="sales-dashboard-right-area-control">
                <ResponsiveDialog style={{width: "auto"}} language={lang} title={t('cancelTransaction')}
                                  text={t('cancelTransactionWarning')}
                                  onConfirm={cancelTransaction}>
                    <Button disableElevation={performanceMode} size="large" color="error"
                            variant="contained"> {t('cancelTransaction')}</Button>
                </ResponsiveDialog>
                <Button disableElevation={performanceMode}
                        onClick={() => setProductShowcaseWindow(!productShowcaseWindow)} color="info"
                        variant="contained">{t('searchByName')}</Button>
                <Button disableElevation={performanceMode}
                        onClick={() => setCampaignsWindow({first: true, other: true})}
                        color="secondary"
                        variant="contained">{t('campaigns')}</Button>
                <Button disableElevation={performanceMode} disabled={cart.length === 0} color="success"
                        onClick={handleConfirmCart} variant="contained"
                        endIcon={<SendIcon/>}>{t('paymentScreen')}</Button>
            </div>
            <div className="sales-dashboard-right-area-keyboard">
                <NumericKeyboard buttonColor={colorOptions.buttons.salesDashboardRight ?? colorOptions.buttons.default}
                                 performanceMode={performanceMode} dark={dark}/>
            </div>
            {campaignsWindow.first ?
                <div
                    id="campaigns-menu"
                    style={{
                        animation: !performanceMode && (campaignsWindow.other ? "jell-in-top 0.5s ease-in-out forwards" : "jell-out-top 0.5s ease-in-out forwards")
                    }}
                    className="sales-dashboard-right-area-campaigns"
                >
                    <IconButton onClick={() => setCampaignsWindow({first: !performanceMode, other: false})}>
                        <ArrowUpwardIcon/>
                    </IconButton>
                    <Button onClick={() => toggleDiscounts("buy3pay2")} style={{fontSize: 14}}
                            color={discounts.buy3pay2 ? "success" : "error"}
                            variant="contained">{t('buy3Pay2')}</Button>
                    <FormDialog
                        keyboardColor={colorOptions.screenKeyboard.salesDashboardRight ?? colorOptions.screenKeyboard.default}
                        language={lang}
                        dialog={t('taxFreeForStudents')}
                        dark={dark}
                        errorText={t('errorInvalidStudentID')}
                        label={t('studentID')}
                        disabled={discounts.studentTaxFree}
                        onOff={discounts.studentTaxFree}
                        ScreenKeyboardComponent={ScreenKeyboard}
                        keyboardContext={keyboardContext}
                        buttonName={t('studentTaxFree')}
                        func={handleStudentTaxFree}/>
                    <Button onClick={() => toggleDiscounts("percentageDiscounts")} style={{fontSize: 14}}
                            color={discounts.percentageDiscounts ? "success" : "error"}
                            variant="contained">{t('percentageDiscounts')}</Button>
                </div>
                :
                <></>
            }

            {productShowcaseWindow ?
                <>
                    <div style={{position: "fixed", left: 0, top: "4vh", zIndex: 12}}>
                        <IconButton onClick={() => setProductShowcaseWindow(false)} color="error">
                            <CloseOutlinedIcon/>
                        </IconButton>
                    </div>
                    <ProductShowcase
                        cardColor={colorOptions.productCard.salesDashboardRight ?? colorOptions.productCard.default}
                        buttonColor={colorOptions.screenKeyboard.salesDashboardRight ?? colorOptions.screenKeyboard.default}
                        performanceMode={performanceMode} language={lang}
                        ScreenKeyboardComponent={ScreenKeyboard}
                        keyboardContext={keyboardContext} dark={dark} onClick={addToCart} data={products}/>
                </>
                :
                <></>}
        </div>
    );
})

export default SalesDashboardRightArea;
