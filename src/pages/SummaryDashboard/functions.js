/**
 * Calculates the total amount from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @returns {number} Total amount from all active receipts.
 */
export function calcTotalAmount(receipts) {
    return receipts.reduce((accumulator, {active, total}) => active ? accumulator + total : accumulator, 0);
}

/**
 * Calculates the total amount without discount from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @returns {number} Total amount without discount from all active receipts.
 */
export function calcTotalAmountWithoutDiscount(receipts) {
    return receipts.reduce((accumulator, {active, subTotal}) => active ? accumulator + subTotal : accumulator, 0);
}

/**
 * Calculates the total amount paid from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @returns {number} Total amount paid from all active receipts.
 */
export function calcTotalPaid(receipts) {
    return receipts.reduce((accumulator, {active, amountPaid}) => active ? accumulator + amountPaid : accumulator, 0);
}

/**
 * Calculates the total change from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @returns {number} Total change from all active receipts.
 */
export function calcTotalChange(receipts) {
    return receipts.reduce((accumulator, {active, change}) => active ? accumulator + change : accumulator, 0);
}

/**
 * Calculates the total tax from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @returns {number} Total tax from all active receipts.
 */
export function calcTotalTax(receipts) {
    return receipts.reduce((accumulator, {active, totalTax}) => active ? accumulator + totalTax : accumulator, 0);
}

/**
 * Calculates the total amount paid with card from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {string} receipts[].transactions[].type - Type of transaction (e.g., 'card').
 * @param {number} receipts[].transactions[].price - Price of the transaction.
 * @returns {number} Total amount paid with card from all active receipts.
 */
export function calcTotalAmountWithCard(receipts) {
    return receipts.reduce((total, {active, transactions}) => {
        if (!active) return total;
        return total + transactions.reduce((cardTotal, {
            type,
            price
        }) => type === "card" ? cardTotal + price : cardTotal, 0);
    }, 0);
}

/**
 * Calculates the total amount paid with cash from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {string} receipts[].transactions[].type - Type of transaction (e.g., 'cash').
 * @param {number} receipts[].transactions[].price - Price of the transaction.
 * @returns {number} Total amount paid with cash from all active receipts.
 */
export function calcTotalAmountWithCash(receipts) {
    return receipts.reduce((accumulator, {active, transactions}) => {
        if (!active) return accumulator;
        return accumulator + transactions.reduce((previousValue, {
            type,
            price
        }) => type === "cash" ? previousValue + price : previousValue, 0);
    }, 0);
}

/**
 * Calculates the total payback amount from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {string} receipts[].transactions[].type - Type of transaction (e.g., 'payback').
 * @param {number} receipts[].transactions[].price - Price of the transaction.
 * @returns {number} Total payback amount from all active receipts.
 */
export function calcTotalPayback(receipts) {
    return receipts.reduce((accumulator, {active, transactions}) => {
        if (!active) return accumulator;
        return accumulator + transactions.reduce((previousValue, {
            type,
            price
        }) => type === "payback" ? previousValue + price : previousValue, 0);
    }, 0);
}

/**
 * Finds the name associated with a given ID from an array.
 *
 * @param {Array} arr - Array of objects.
 * @param {number|string} id - ID to search for.
 * @returns {string|undefined} Name associated with the ID or undefined if not found.
 */
export function findNameWithId(arr, id) {
    const foundItem = arr.find(item => item.id === id);
    return foundItem ? foundItem.name : undefined;
}

/**
 * Finds the top-selling category from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {boolean} receipts[].active - Indicates if the receipt is active.
 * @param {Array} receipts[].cart - Array of cart item objects.
 * @param {number} receipts[].cart[].categoryId - Category ID of the cart item.
 * @param {number} receipts[].cart[].quantity - Quantity of the cart item.
 * @returns {number} ID of the top-selling category.
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
 * Finds the top-selling subcategory from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {boolean} receipts[].active - Indicates if the receipt is active.
 * @param {Array} receipts[].cart - Array of cart item objects.
 * @param {number} receipts[].cart[].subCategoryId - Subcategory ID of the cart item.
 * @param {number} receipts[].cart[].quantity - Quantity of the cart item.
 * @returns {number} ID of the top-selling subcategory.
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
 * Finds the top-selling product from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {boolean} receipts[].active - Indicates if the receipt is active.
 * @param {Array} receipts[].cart - Array of cart item objects.
 * @param {number} receipts[].cart[].id - Product ID of the cart item.
 * @param {number} receipts[].cart[].quantity - Quantity of the cart item.
 * @returns {number} ID of the top-selling product.
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
 * Finds the top-selling product from a campaign (discounted price) from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {boolean} receipts[].active - Indicates if the receipt is active.
 * @param {Array} receipts[].cart - Array of cart item objects.
 * @param {number} receipts[].cart[].id - Product ID of the cart item.
 * @param {number} receipts[].cart[].quantity - Quantity of the cart item.
 * @param {number} [receipts[].cart[].discountedPrice] - Discounted price of the cart item.
 * @returns {number} ID of the top-selling product from a campaign.
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
 * Finds the most profitable category from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {boolean} receipts[].active - Indicates if the receipt is active.
 * @param {Array} receipts[].cart - Array of cart item objects.
 * @param {number} receipts[].cart[].categoryId - Category ID of the cart item.
 * @param {number} receipts[].cart[].quantity - Quantity of the cart item.
 * @param {number} receipts[].cart[].price - Price of the cart item.
 * @param {number} [receipts[].cart[].discountedPrice] - Discounted price of the cart item.
 * @returns {number} ID of the most profitable category.
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
 * Finds the most profitable subcategory from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {boolean} receipts[].active - Indicates if the receipt is active.
 * @param {Array} receipts[].cart - Array of cart item objects.
 * @param {number} receipts[].cart[].subCategoryId - Subcategory ID of the cart item.
 * @param {number} receipts[].cart[].quantity - Quantity of the cart item.
 * @param {number} receipts[].cart[].price - Price of the cart item.
 * @param {number} [receipts[].cart[].discountedPrice] - Discounted price of the cart item.
 * @returns {number} ID of the most profitable subcategory.
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
 * Finds the most profitable product from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {boolean} receipts[].active - Indicates if the receipt is active.
 * @param {Array} receipts[].cart - Array of cart item objects.
 * @param {number} receipts[].cart[].id - Product ID of the cart item.
 * @param {number} receipts[].cart[].quantity - Quantity of the cart item.
 * @param {number} receipts[].cart[].price - Price of the cart item.
 * @param {number} [receipts[].cart[].discountedPrice] - Discounted price of the cart item.
 * @returns {number} ID of the most profitable product.
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
 * Finds the most refunded products from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {boolean} receipts[].active - Indicates if the receipt is active.
 * @param {boolean} receipts[].refund - Indicates if the receipt is a refund.
 * @param {Array} receipts[].cart - Array of cart item objects.
 * @param {number} receipts[].cart[].id - Product ID of the cart item.
 * @param {number} receipts[].cart[].quantity - Quantity of the cart item.
 * @returns {Object} Object containing the IDs of the most refunded products and the quantity.
 */
export function findMostRefundedProducts(receipts) {
    const productQuantities = receipts.reduce((acc, receipt) => {
        if ((receipt.active && receipt.refund) || (!receipt.active && !receipt.refund)) {
            receipt.cart.forEach(product => {
                const key = product.id;
                const quantity = product.quantity;
                if (!acc[key]) {
                    acc[key] = {quantity: 0, active: receipt.active};
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

    Object.entries(productQuantities).forEach(([id, {quantity, active}]) => {
        if (!active && quantity > 0) {
            if (quantity > maxQuantity) {
                maxQuantity = quantity;
                quantityMap = {[id]: 1};
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
 * Finds the hour with the most sales from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {string} receipts[].date - Date of the receipt.
 * @returns {number} The hour with the most sales.
 */
export function findMostSoldHour(receipts) {
    const hourCounts = receipts.reduce((acc, receipt) => {
        const hour = new Date(receipt.date).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, {});

    const mostSoldHour = Object.entries(hourCounts).reduce((max, [hour, count]) => {
        return count > max.count ? {hour, count} : max;
    }, {hour: null, count: 0});

    return parseInt(mostSoldHour.hour);
}

/**
 * Finds the hour with the least sales from a list of receipts.
 *
 * @param {Array} receipts - Array of receipt objects.
 * @param {string} receipts[].date - Date of the receipt.
 * @returns {number} The hour with the least sales.
 */
export function findLeastSoldHour(receipts) {
    const hourCounts = receipts.reduce((acc, receipt) => {
        const hour = new Date(receipt.date).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, {});

    const leastSoldHour = Object.entries(hourCounts).reduce((min, [hour, count]) => {
        return count < min.count ? {hour, count} : min;
    }, {hour: null, count: Infinity});

    return parseInt(leastSoldHour.hour);
}

/**
 * Filters receipts by date based on the provided filter type.
 *
 * @param {Array} _receipts - Array of receipt objects.
 * @param {string} _filterType - Type of filter ('hourly', 'daily', 'monthly', 'yearly').
 * @param {number} [_case=1] - Case number to filter by.
 * @returns {Array} Filtered array of receipt objects.
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
