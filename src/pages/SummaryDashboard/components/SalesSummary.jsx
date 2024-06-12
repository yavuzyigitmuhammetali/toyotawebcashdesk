import React from 'react';
import {useTranslation} from 'react-i18next';

const SalesSummary = ({summary}) => {
    const {t} = useTranslation();

    return (
        <div className="summary-dashboard-tab">
            <hr/>
            <div>{t('salesSummary')}</div>
            <hr/>
            <ul>
                <li>
                    {t('totalShoppingAmount')}: {summary.totalAmount.toFixed(2)}$
                </li>
                <li>
                    {t('totalPriceWithoutDiscount')}: {summary.totalAmountWithoutDiscount.toFixed(2)}$
                </li>
                <li>
                    {t('totalPaidAmount')}: {summary.totalPaid.toFixed(2)}$
                </li>
                <li>
                    {t('totalChange')}: {summary.totalChange.toFixed(2)}$
                </li>
                <li>
                    {t('totalTax')}: {summary.totalTax.toFixed(2)}$
                </li>
                <li>
                    {t('totalAmountPaidInCash')}: {summary.totalAmountWithCard.toFixed(2)}$
                </li>
                <li>
                    {t('totalAmountPaidWithCard')}: {summary.totalAmountWithCash.toFixed(2)}$
                </li>
                <li>
                    {t('totalRefundedAmount')}: {(-summary.totalPayback).toFixed(2)}$
                </li>
            </ul>
            <br/>
            <hr/>
        </div>
    );
};

export default SalesSummary;
