import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import './index.css';
import AppDataContext from '../../shared/states/AppData/context';
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
    findTopSellingCampaignProduct,
    findTopSellingCategory,
    findTopSellingProduct,
    findTopSellingSubCategory,
} from './functions';
import SalesSummary from './components/SalesSummary';
import BestsSummary from './components/BestsSummary';
import OutOfStockProducts from './components/OutOfStockProducts';
import {Box, Button, CircularProgress, ToggleButtonGroup} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import {defaultReceipt} from '../../shared/states/AppData/defaultData';
import {useNavigate} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import AppStatusContext from '../../shared/states/AppStatus/context';
import {useTranslation} from 'react-i18next';

const SummaryDashboard = () => {
    const {t} = useTranslation();
    const {status, dark, performanceMode} = useContext(AppStatusContext);
    const {receipts: _receipts, categories, subCategories, products, fetchReceipts, fetchProducts} =
        useContext(AppDataContext);

    const [alignment, setAlignment] = useState('');
    const [receipts, setReceipts] = useState([defaultReceipt]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(true);

    const filteredReceipts = useMemo(
        () => filterReceiptsByDate(_receipts, alignment, status.case),
        [_receipts, alignment, status.case]
    );

    useEffect(() => {
        filteredReceipts.length ? setReceipts(filteredReceipts) : setAlignment('all');
    }, [filteredReceipts]);

    const handleChange = useCallback(
        (event, newAlignment) => {
            if (newAlignment !== null) {
                setAlignment(newAlignment);
            }
        },
        [setAlignment]
    );

    const summary = useMemo(() => {
        return {
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
            leastSoldHour: findLeastSoldHour(receipts),
        };
    }, [receipts]);

    const handleDialogClose = (confirmed) => {
        setOpenDialog(false);
        if (confirmed) {
            setLoading(true);
            Promise.all([fetchReceipts(), fetchProducts()]).then(() => {
                setAlignment('hourly');
                setLoading(false);
            });
        } else {
            navigate('/');
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
                    <DialogTitle id="alert-dialog-title">{t('errorTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {t('simulateSummaryLoadWarning')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleDialogClose(false)}>{t('cancel')}</Button>
                        <Button onClick={() => handleDialogClose(true)} autoFocus>
                            {t('confirm')}
                        </Button>
                    </DialogActions>
                </Dialog>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <div className={`summary-dashboard-container ${performanceMode ? 'performance-mode' : ''}`}>
            <div
                className={`summary-dashboard-left ${dark ? 'dark-theme' : ''} ${performanceMode ? 'performance-mode' : ''}`}>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    className={`summary-dashboard-left-header ${performanceMode ? 'performance-mode' : ''}`}
                >
                    <ToggleButton size="small" value="hourly">
                        {t('hourly')}
                    </ToggleButton>
                    <ToggleButton size="small" value="daily">
                        {t('daily')}
                    </ToggleButton>
                    <ToggleButton size="small" value="monthly">
                        {t('monthly')}
                    </ToggleButton>
                    <ToggleButton size="small" value="yearly">
                        {t('yearly')}
                    </ToggleButton>
                    <ToggleButton size="small" value="all">
                        {t('allTime')}
                    </ToggleButton>
                </ToggleButtonGroup>

                <SalesSummary summary={summary}/>
                <BestsSummary summary={summary} categories={categories} subCategories={subCategories}
                              products={products}/>
            </div>
            <div
                className={`summary-dashboard-right ${dark ? 'summary-dashboard-right-dark' : ''} ${performanceMode ? 'performance-mode' : ''}`}>
                <div
                    className={`summary-dashboard-right-header ${dark ? 'summary-dashboard-right-header-dark' : ''} ${performanceMode ? 'performance-mode' : ''}`}>
                    {t('outOfStockProducts')}
                </div>
                <br/>
                <OutOfStockProducts products={products} dark={dark} navigate={navigate}
                                    performanceMode={performanceMode}/>
            </div>
        </div>
    );
};

export default SummaryDashboard;
