import React from 'react';
import {useTranslation} from 'react-i18next';
import {findNameWithId} from '../functions';

const BestsSummary = ({summary, categories, subCategories, products}) => {
    const {t} = useTranslation();

    return (
        <div className="summary-dashboard-tab">
            <div>{t('bests')}</div>
            <hr/>
            <ul>
                <li>
                    {t('topSellingCategory')}: {findNameWithId(categories, summary.topSellingCategory)}
                </li>
                <li>
                    {t('topSellingSubCategory')}: {findNameWithId(subCategories, summary.topSellingSubCategory)}
                </li>
                <li>
                    {t('topSellingProduct')}: {findNameWithId(products, summary.topSellingProduct)}
                </li>
                <li>
                    {t('topSellingCampaignProduct')}: {findNameWithId(products, summary.topSellingCampaignProduct)}
                </li>
                <li>
                    {t('mostProfitableCategory')}: {findNameWithId(categories, summary.mostProfitableCategory)}
                </li>
                <li>
                    {t('mostProfitableSubCategory')}: {findNameWithId(subCategories, summary.mostProfitableSubCategory)}
                </li>
                <li>
                    {t('mostProfitableProduct')}: {findNameWithId(products, summary.mostProfitableProduct)}
                </li>
                <li>
                    {t('mostRefundedProduct')}:{' '}
                    {summary.mostRefundedProducts.refundedProducts.map((id) => findNameWithId(products, id)).join(', ')} (
                    {summary.mostRefundedProducts.quantity.toFixed(2)})
                </li>
                <li>
                    {t('mostSoldHour')}: {summary.mostSoldHour}:00-{summary.mostSoldHour + 1}:00
                </li>
                <li>
                    {t('leastSoldHour')}: {summary.leastSoldHour}:00-{summary.leastSoldHour + 1}:00
                </li>
            </ul>
        </div>
    );
};

export default BestsSummary;
