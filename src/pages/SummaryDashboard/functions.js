/**
 * Calculate the total amount of active receipts.
 * @param {Array} receipts - The array of receipts to calculate the total amount from.
 * @returns {number} - The total amount of active receipts.
 */
export function calcTotalAmount(receipts){
    return receipts.reduce((accumulator, {active, total}) => active ? accumulator + total : accumulator, 0);
}

/**
 * Calculate the total amount without discount of active receipts.
 * @param {Array} receipts - The array of receipts to calculate the total amount without discount from.
 * @returns {number} - The total amount without discount of active receipts.
 */
export function calcTotalAmountWithoutDiscount(receipts){
    return receipts.reduce((accumulator, {active, subTotal}) => active ? accumulator + subTotal : accumulator, 0);
}

/**
 * Calculate the total amount paid of active receipts.
 * @param {Array} receipts - The array of receipts to calculate the total amount paid from.
 * @returns {number} - The total amount paid of active receipts.
 */
export function calcTotalPaid(receipts){
    return receipts.reduce((accumulator, {active, amountPaid}) => active ? accumulator + amountPaid : accumulator, 0);
}

/**
 * Calculate the total change of active receipts.
 * @param {Array} receipts - The array of receipts to calculate the total change from.
 * @returns {number} - The total change of active receipts.
 */
export function calcTotalChange(receipts){
    return receipts.reduce((accumulator, {active, change}) => active ? accumulator + change : accumulator, 0);
}

/**
 * Calculate the total tax of active receipts.
 * @param {Array} receipts - The array of receipts to calculate the total tax from.
 * @returns {number} - The total tax of active receipts.
 */
export function calcTotalTax(receipts){
    return receipts.reduce((accumulator, {active, totalTax}) => active ? accumulator + totalTax : accumulator, 0);
}

/**
 * Calculate the total amount with card payments of active receipts.
 * @param {Array} receipts - The array of receipts to calculate the total amount with card payments from.
 * @returns {number} - The total amount with card payments of active receipts.
 */
export function calcTotalAmountWithCard(receipts){
    return receipts.reduce((total, {active, transactions}) => {
        if (!active) return total;
        return total + transactions.reduce((cardTotal, {type, price}) => type === "card" ? cardTotal + price : cardTotal, 0);
    }, 0);
}

/**
 * Calculate the total amount with cash payments of active receipts.
 * @param {Array} receipts - The array of receipts to calculate the total amount with cash payments from.
 * @returns {number} - The total amount with cash payments of active receipts.
 */
export function calcTotalAmountWithCash(receipts){
    return receipts.reduce((accumulator, {active, transactions}) => {
        if (!active) return accumulator;
        return accumulator + transactions.reduce((previousValue, {type, price}) => type === "cash" ? previousValue + price : previousValue, 0);
    }, 0);
}

/**
 * Calculate the total payback amount of active receipts.
 * @param {Array} receipts - The array of receipts to calculate the total payback amount from.
 * @returns {number} - The total payback amount of active receipts.
 */
export function calcTotalPayback(receipts){
    return receipts.reduce((accumulator, {active, transactions}) => {
        if (!active) return accumulator;
        return accumulator + transactions.reduce((previousValue, {type, price}) => type === "payback" ? previousValue + price : previousValue, 0);
    }, 0);
}

/**
 * Find the name associated with a specific ID in an array.
 * @param {Array} arr - The array to search for the ID.
 * @param {number} id - The ID to find the associated name for.
 * @returns {string|undefined} - The name associated with the ID, or undefined if not found.
 */
export function findNameWithId(arr, id) {
    const foundItem = arr.find(item => item.id === id);
    return foundItem ? foundItem.name : undefined;
}

/**
 * Find the ID of the top-selling category based on the quantity sold in receipts.
 * @param {Array} receipts - The array of receipts to analyze.
 * @returns {number} - The ID of the top-selling category.
 */
export function findTopSellingCategory(receipts) {
    const categorySales = {};
    receipts.forEach(receipt => {
        if (receipt.active) {
            receipt.cart.forEach(item => {
                categorySales[item.categoryId] = (categorySales[item.categoryId] || 0) + item.quantity;
            });
        }
    });
    let topSellingCategoryId = null;
    let maxQuantity = 0;
    for (const [categoryId, quantity] of Object.entries(categorySales)) {
        if (quantity > maxQuantity) {
            maxQuantity = quantity;
            topSellingCategoryId = categoryId;
        }
    }
    return parseInt(topSellingCategoryId);
}

/**
 * Find the ID of the top-selling sub-category based on the quantity sold in receipts.
 * @param {Array} receipts - The array of receipts to analyze.
 * @returns {number} - The ID of the top-selling sub-category.
 */
export function findTopSellingSubCategory(receipts) {
    const subCategorySales = {};
    receipts.forEach(receipt => {
        if (receipt.active) {
            receipt.cart.forEach(item => {
                subCategorySales[item.subCategoryId] = (subCategorySales[item.subCategoryId] || 0) + item.quantity;
            });
        }
    });
    let topSellingSubCategoryId = null;
    let maxQuantity = 0;
    for (const [subCategoryId, quantity] of Object.entries(subCategorySales)) {
        if (quantity > maxQuantity) {
            maxQuantity = quantity;
            topSellingSubCategoryId = subCategoryId;
        }
    }
    return parseInt(topSellingSubCategoryId);
}

/**
 * Find the ID of the top-selling product based on the quantity sold in receipts.
 * @param {Array} receipts - The array of receipts to analyze.
 * @returns {number} - The ID of the top-selling product.
 */
export function findTopSellingProduct(receipts) {
    const productSales = {};
    receipts.forEach(receipt => {
        if (receipt.active) {
            receipt.cart.forEach(item => {
                productSales[item.id] = (productSales[item.id] || 0) + item.quantity;
            });
        }
    });
    let topSellingProductId = null;
    let maxQuantity = 0;
    for (const [productId, quantity] of Object.entries(productSales)) {
        if (quantity > maxQuantity) {
            maxQuantity = quantity;
            topSellingProductId = productId;
        }
    }
    return parseInt(topSellingProductId);
}

/**
 * Find the ID of the top-selling campaign product based on the quantity sold in receipts with a discount.
 * @param {Array} receipts - The array of receipts to analyze.
 * @returns {number} - The ID of the top-selling campaign product.
 */
export function findTopSellingCampaignProduct(receipts) {
    const productSales = {};
    receipts.forEach(receipt => {
        if (receipt.active) {
            receipt.cart.forEach(item => {
                if (item.discountedPrice) {
                    productSales[item.id] = (productSales[item.id] || 0) + item.quantity;
                }
            });
        }
    });
    let topSellingProductId = null;
    let maxQuantity = 0;
    for (const [productId, quantity] of Object.entries(productSales)) {
        if (quantity > maxQuantity) {
            maxQuantity = quantity;
            topSellingProductId = productId;
        }
    }
    return parseInt(topSellingProductId);
}

/**
 * Find the ID of the most profitable category based on the profit generated from sales in receipts.
 * @param {Array} receipts - The array of receipts to analyze.
 * @returns {number} - The ID of the most profitable category.
 */
export function findMostProfitableCategory(receipts) {
    const categories = {};
    receipts.forEach(receipt => {
        if (receipt.active) {
            receipt.cart.forEach(item => {
                const profit = item.quantity * (item.price - (item.discountedPrice || 0));
                categories[item.categoryId] = (categories[item.categoryId] || 0) + profit;
            });
        }
    });
    return parseInt(Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b));
}

/**
 * Find the ID of the most profitable sub-category based on the profit generated from sales in receipts.
 * @param {Array} receipts - The array of receipts to analyze.
 * @returns {number} - The ID of the most profitable sub-category.
 */
export function findMostProfitableSubCategory(receipts) {
    const subCategories = {};
    receipts.forEach(receipt => {
        if (receipt.active) {
            receipt.cart.forEach(item => {
                const profit = item.quantity * (item.price - (item.discountedPrice || 0));
                subCategories[item.subCategoryId] = (subCategories[item.subCategoryId] || 0) + profit;
            });
        }
    });
    return parseInt(Object.keys(subCategories).reduce((a, b) => subCategories[a] > subCategories[b] ? a : b));
}

/**
 * Find the ID of the most profitable product based on the profit generated from sales in receipts.
 * @param {Array} receipts - The array of receipts to analyze.
 * @returns {number} - The ID of the most profitable product.
 */
export function findMostProfitableProduct(receipts) {
    const products = {};
    receipts.forEach(receipt => {
        if (receipt.active) {
            receipt.cart.forEach(item => {
                const profit = item.quantity * (item.price - (item.discountedPrice || 0));
                products[item.id] = (products[item.id] || 0) + profit;
            });
        }
    });
    return parseInt(Object.keys(products).reduce((a, b) => products[a] > products[b] ? a : b));
}

/**
 * Find the most refunded products based on the quantity refunded in receipts.
 * @param {Array} receipts - The array of receipts to analyze.
 * @returns {Object} - An object containing the refunded products and the quantity refunded.
 */
export function findMostRefundedProducts(receipts) {
    const productQuantities = receipts.reduce((acc, receipt) => {
        if ((receipt.active && receipt.refund) || (!receipt.active && !receipt.refund)) {
            receipt.cart.forEach(product => {
                const key = product.id;
                const quantity = product.quantity;
                if (!acc[key]) {
                    acc[key] = { quantity: 0, active: receipt.active };
                }
                if (receipt.active) {
                    acc[key].quantity -= quantity;
                } else {
                    acc[key].quantity += quantity;
                }
            });
        }
        return acc;
    }, {});

    let maxQuantity = 0;
    let quantityMap = {};

    Object.entries(productQuantities).forEach(([id, { quantity, active }]) => {
        if (!active && quantity > 0) {
            if (quantity > maxQuantity) {
                maxQuantity = quantity;
                quantityMap = { [id]: 1 };
            } else if (quantity === maxQuantity) {
                quantityMap[id] = 1;
            }
        }
    });

    return {
        refundedProducts: Object.keys(quantityMap).map(id => parseInt(id)),
        quantity: maxQuantity
    };
}

/**
 * Find the hour with the most sales based on the receipts.
 * @param {Array} receipts - The array of receipts to analyze.
 * @returns {number} - The hour with the most sales.
 */
export function findMostSoldHour(receipts) {
    const hourCounts = receipts.reduce((acc, receipt) => {
        const hour = new Date(receipt.date).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, {});

    const mostSoldHour = Object.entries(hourCounts).reduce((max, [hour, count]) => {
        return count > max.count ? { hour, count } : max;
    }, { hour: null, count: 0 });

    return parseInt(mostSoldHour.hour);
}

/**
 * Find the hour with the least sales based on the receipts.
 * @param {Array} receipts - The array of receipts to analyze.
 * @returns {number} - The hour with the least sales.
 */
export function findLeastSoldHour(receipts) {
    const hourCounts = receipts.reduce((acc, receipt) => {
        const hour = new Date(receipt.date).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, {});

    const leastSoldHour = Object.entries(hourCounts).reduce((min, [hour, count]) => {
        return count < min.count ? { hour, count } : min;
    }, { hour: null, count: Infinity });

    return parseInt(leastSoldHour.hour);
}

/**
 * Filter receipts based on a specific date range and case.
 * @param {Array} _receipts - The array of receipts to filter.
 * @param {string} _filterType - The type of date range to filter by (hourly, daily, monthly, yearly).
 * @param {number} _case - The case to filter by.
 * @returns {Array} - The filtered receipts based on the date range and case.
 */
export function filterReceiptsByDate(_receipts, _filterType, _case = 1) {
    const referenceDate = new Date();
    let startDate, endDate;

    switch (_filterType) {
        case 'hourly':
            startDate = new Date(referenceDate.setHours(referenceDate.getHours() - 1));
            endDate = new Date();
            break;
        case 'daily':
            startDate = new Date(referenceDate.setDate(referenceDate.getDate() - 1));
            endDate = new Date();
            break;
        case 'monthly':
            startDate = new Date(referenceDate.setMonth(referenceDate.getMonth() - 1));
            endDate = new Date();
            break;
        case 'yearly':
            startDate = new Date(referenceDate.setFullYear(referenceDate.getFullYear() - 1));
            endDate = new Date();
            break;
        default:
            startDate = new Date(0);
            endDate = new Date();
            break;
    }

    return _receipts.filter(receipt => receipt.case === _case && new Date(receipt.date) >= startDate && new Date(receipt.date) <= endDate);
}
