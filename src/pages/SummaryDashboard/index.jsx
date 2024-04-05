import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import "./summaryDashboard.css"
import AppDataContext from "../../shared/state/AppData/context";
import {
    calcTotalAmount,
    calcTotalAmountWithCard,
    calcTotalAmountWithCash,
    calcTotalAmountWithoutDiscount,
    calcTotalChange,
    calcTotalPaid,
    calcTotalPayback,
    calcTotalTax,
    filterReceiptsByDate,
    findLeastSoldHour,
    findMostProfitableCategory,
    findMostProfitableProduct,
    findMostProfitableSubCategory,
    findMostRefundedProducts,
    findMostSoldHour,
    findNameWithId,
    findTopSellingCampaignProduct,
    findTopSellingCategory,
    findTopSellingProduct,
    findTopSellingSubCategory
} from "./functions";
import ProductCard from "../../shared/components/ProductCard/ProductCard";
import {Box, Button, CircularProgress, ToggleButtonGroup} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import {defaultReceipt} from "../../shared/state/AppData/defaultData";
import {useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import AppStatusContext from "../../shared/state/AppStatus/context";
import {useTranslation} from "react-i18next";

function SummaryDashboard({dark = false}) {
    const {t} = useTranslation();

    const {
        receipts: _receipts, categories, subCategories, products, fetchReceipts,
    } = useContext(AppDataContext)
    const {status} = useContext(AppStatusContext)
    const [alignment, setAlignment] = React.useState('');
    const [receipts, setReceipts] = useState([defaultReceipt])
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(true);
    const filteredReceipts = useMemo(() => filterReceiptsByDate(_receipts, alignment, status.case), [_receipts, alignment, status.case]);

    useEffect(() => {
        filteredReceipts.length ? setReceipts(filteredReceipts) : setAlignment("all");
    }, [filteredReceipts]);

    const handleChange = useCallback((event, newAlignment) => {
        setAlignment(newAlignment);
    }, [setAlignment]);

    const [summary, setSummary] = useState({
        totalAmount: 0,
        totalAmountWithoutDiscount: 0,
        totalPaid: 0,
        totalChange: 0,
        totalTax: 0,
        totalAmountWithCard: 0,
        totalAmountWithCash: 0,
        totalPayback: 0,
        topSellingCategory: 0,
        topSellingSubCategory: 0,
        topSellingProduct: 0,
        topSellingCampaignProduct: 0,
        mostProfitableCategory: 0,
        mostProfitableSubCategory: 0,
        mostProfitableProduct: 0,
        mostRefundedProducts: {refundedProducts: [], quantity: 0},
        mostSoldHour: 0,
        leastSoldHour: 0
    });
    useEffect(() => {

        const calculateSummary = () => {
            setSummary({
                totalAmount: calcTotalAmount(receipts),
                totalAmountWithoutDiscount: calcTotalAmountWithoutDiscount(receipts),
                totalPaid: calcTotalPaid(receipts),
                totalChange: calcTotalChange(receipts),
                totalTax: calcTotalTax(receipts),
                totalAmountWithCard: calcTotalAmountWithCard(receipts),
                totalAmountWithCash: calcTotalAmountWithCash(receipts),
                totalPayback: calcTotalPayback(receipts),
                topSellingCategory: findTopSellingCategory(receipts),
                topSellingSubCategory: findTopSellingSubCategory(receipts),
                topSellingProduct: findTopSellingProduct(receipts),
                topSellingCampaignProduct: findTopSellingCampaignProduct(receipts),
                mostProfitableCategory: findMostProfitableCategory(receipts),
                mostProfitableSubCategory: findMostProfitableSubCategory(receipts),
                mostProfitableProduct: findMostProfitableProduct(receipts),
                mostRefundedProducts: findMostRefundedProducts(receipts),
                mostSoldHour: findMostSoldHour(receipts),
                leastSoldHour: findLeastSoldHour(receipts)
            });
        };
        calculateSummary();
    }, [receipts]);

    const handleDialogClose = confirmed => {
        setOpenDialog(false);
        if (confirmed) {
            setLoading(true);
                fetchReceipts().then(() => {
                    setAlignment('hourly')
                    setLoading(false);
                });
        }else {
            navigate('/')
        }
    };
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Dialog
                    open={openDialog}
                    onClose={() => handleDialogClose(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{t("errorTitle")}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {t("simulatePaymentWarning")}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleDialogClose(false)}>{t("cancel")}</Button>
                        <Button onClick={() => handleDialogClose(true)} autoFocus>
                            {t("confirm")}
                        </Button>
                    </DialogActions>
                </Dialog>
                <CircularProgress />
            </Box>
        );
    }


    return (
            <div className="summary-dashboard-container">
                <div className="summary-dashboard-left">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        className="summary-dashboard-left-header"
                    >
                        <ToggleButton size="small" value="hourly">{t("hourly")}</ToggleButton>
                        <ToggleButton size="small" value="daily">{t("daily")}</ToggleButton>
                        <ToggleButton size="small" value="monthly">{t("monthly")}</ToggleButton>
                        <ToggleButton size="small" value="yearly">{t("yearly")}</ToggleButton>
                        <ToggleButton size="small" value="all">{t("allTime")}</ToggleButton>
                    </ToggleButtonGroup>

                    <div className="summary-dashboard-tab">
                        <hr/>
                        <div>{t("salesSummary")}</div>
                        <hr/>
                        <ul>
                            <li>{t("totalShoppingAmount")}: {summary.totalAmount}$</li>
                            <li>{t("totalPriceWithoutDiscount")}: {summary.totalAmountWithoutDiscount}$</li>
                            <li>{t("totalPaidAmount")}: {summary.totalPaid}$</li>
                            <li>{t("totalChange")}: {summary.totalChange}$</li>
                            <li>{t("totalTax")}: {summary.totalTax}$</li>
                            <li>{t("totalAmountPaidInCash")}: {summary.totalAmountWithCard}$</li>
                            <li>{t("totalAmountPaidWithCard")}: {summary.totalAmountWithCash}$</li>
                            <li>{t("totalRefundedAmount")}: {-summary.totalPayback}$</li>
                        </ul>
                        <br/>
                        <hr/>
                    </div>
                    <div className="summary-dashboard-tab">
                        <div>{t("bests")}</div>
                        <hr/>
                        <ul>
                            <li>{t("topSellingCategory")}: {findNameWithId(categories, summary.topSellingCategory)}</li>
                            <li>{t("topSellingSubCategory")}: {findNameWithId(subCategories, summary.topSellingSubCategory)}</li>
                            <li>{t("topSellingProduct")}: {findNameWithId(products, summary.topSellingProduct)}</li>
                            <li>{t("topSellingCampaignProduct")}: {findNameWithId(products, summary.topSellingCampaignProduct)}</li>
                            <li>{t("mostProfitableCategory")}: {findNameWithId(categories, summary.mostProfitableCategory)}</li>
                            <li>{t("mostProfitableSubCategory")}: {findNameWithId(subCategories, summary.mostProfitableSubCategory)}</li>
                            <li>{t("mostProfitableProduct")}: {findNameWithId(products, summary.mostProfitableProduct)}</li>
                            <li>{t("mostRefundedProduct")}: {summary.mostRefundedProducts.refundedProducts.map(id => findNameWithId(products, id)).join(', ')} ({summary.mostRefundedProducts.quantity})
                            </li>
                            <li>{t("mostSoldHour")}: {summary.mostSoldHour}:00-{summary.mostSoldHour + 1}:00</li>
                            <li>{t("leastSoldHour")}: {summary.leastSoldHour}:00-{summary.leastSoldHour + 1}:00</li>
                        </ul>
                    </div>
                </div>
                <div className="summary-dashboard-right">
                    <div className="summary-dashboard-right-header">{t("outOfStockProducts")}</div>
                    <br/>
                    {products.filter(product => !product.stock).map((product, key) => <ProductCard key={key}
                                                                                                   price={product.price}
                                                                                                   barcode={product.barcode}
                                                                                                   favorite={product.isFavourite}
                                                                                                   stock={product.stock}
                                                                                                   dark={dark}
                                                                                                   fraction={product.fraction}
                                                                                                   name={product.name}
                                                                                                   src={product.image}
                                                                                                   discountText={product.campaign}
                                                                                                   onClick={() => navigate('/products/list/' + product.id)}/>)}

                </div>
            </div>
    );
}

export default SummaryDashboard;