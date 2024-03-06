export function calcTotalAmount(receipts){
    return receipts.filter(receipt=>receipt.active).reduce((accumulator, currentValue)=>accumulator + currentValue.total, 0)
}

export function calcTotalAmountWithoutDiscount(receipts){
    return receipts.filter(receipt=>receipt.active).reduce((accumulator, currentValue)=>accumulator + currentValue.subTotal, 0)
}

export function calcTotalPaid(receipts){
    return receipts.filter(receipt=>receipt.active).reduce((accumulator, currentValue)=>accumulator + currentValue.amountPaid, 0)
}

export function calcTotalChange(receipts){
    return receipts.filter(receipt=>receipt.active).reduce((accumulator, currentValue)=>accumulator + currentValue.change, 0)
}

export function calcTotalTax(receipts){
    return receipts.filter(receipt=>receipt.active).reduce((accumulator, currentValue)=>accumulator + currentValue.totalTax, 0)
}

export function calcTotalAmountWithCard(receipts){
    return receipts.filter(receipt=>receipt.active).reduce((accumulator, currentValue)=>accumulator + currentValue.transactions.filter(value => value.type==="card").reduce((previousValue, currentValue1) => previousValue + currentValue1.price,0), 0)
}

export function calcTotalAmountWithCash(receipts){
    return receipts.filter(receipt=>receipt.active).reduce((accumulator, currentValue)=>accumulator + currentValue.transactions.filter(value => value.type==="cash").reduce((previousValue, currentValue1) => previousValue + currentValue1.price,0), 0)
}

export function calcTotalPayback(receipts){
    return receipts.filter(receipt=>receipt.active).reduce((accumulator, currentValue)=>accumulator + currentValue.transactions.filter(value => value.type==="payback").reduce((previousValue, currentValue1) => previousValue + currentValue1.price,0), 0)
}

// ---------------------------------------------------------------------------------------------------------

export function findNameWithId(arr,id){
    return arr.find(item=>item.id===id)?.name;
}

export function findTopSellingCategory(receipts) {
    const categorySales = receipts.filter(item=>item.active).flatMap(receipt => receipt.cart)
        .reduce((acc, item) => {
            acc[item.categoryId] = (acc[item.categoryId] || 0) + item.quantity;
            return acc;
        }, {});
    const topSellingCategory = Object.entries(categorySales).reduce((acc, curr) =>
            curr[1] > (acc.quantity || 0) ? { id: curr[0], quantity: curr[1] } : acc
        , {});

    return parseInt(topSellingCategory.id);
}

export function findTopSellingSubCategory(receipts) {
    const subCategorySales = receipts.filter(item=>item.active).flatMap(receipt => receipt.cart)
        .reduce((acc, item) => {
            acc[item.subCategoryId] = (acc[item.subCategoryId] || 0) + item.quantity;
            return acc;
        }, {});

    const topSellingSubCategory = Object.entries(subCategorySales).reduce((acc, curr) =>
            curr[1] > (acc.quantity || 0) ? { id: curr[0], quantity: curr[1] } : acc
        , {});

    return parseInt(topSellingSubCategory.id);
}

export function findTopSellingProduct(receipts) {
    const productSales = receipts.filter(item=>item.active).flatMap(receipt => receipt.cart)
        .reduce((acc, item) => {
            acc[item.id] = (acc[item.id] || 0) + item.quantity;
            return acc;
        }, {});

    const topSellingProduct = Object.entries(productSales).reduce((acc, curr) =>
            curr[1] > (acc.quantity || 0) ? { id: curr[0], quantity: curr[1] } : acc
        , {});

    return parseInt(topSellingProduct.id);
}

export function findTopSellingCampaignProduct(receipts) {
    const productSales = receipts.filter(item=>item.active).flatMap(receipt => receipt.cart).filter(item=>item.discountedPrice)
        .reduce((acc, item) => {
            acc[item.id] = (acc[item.id] || 0) + item.quantity;
            return acc;
        }, {});

    const topSellingProduct = Object.entries(productSales).reduce((acc, curr) =>
            curr[1] > (acc.quantity || 0) ? { id: curr[0], quantity: curr[1] } : acc
        , {});

    return parseInt(topSellingProduct.id);
}

export function findMostProfitableCategory(receipts) {
    const categories = receipts.filter(item=>item.active).reduce((acc, receipt) => {
        receipt.cart.forEach(item => {
            const categoryId = item.categoryId;
            acc[categoryId] = (acc[categoryId] || 0) + item.quantity * (item.price - item.discountedPrice);
        });
        return acc;
    }, {});

    return parseInt(Object.keys(categories).reduce((a, b) => categories[a] > categories[b] ? a : b));
}

export function findMostProfitableSubCategory(receipts) {
    const subCategories = receipts.filter(item=>item.active).reduce((acc, receipt) => {
        receipt.cart.forEach(item => {
            const subCategoryId = item.subCategoryId;
            acc[subCategoryId] = (acc[subCategoryId] || 0) + item.quantity * (item.price - item.discountedPrice);
        });
        return acc;
    }, {});

    return parseInt(Object.keys(subCategories).reduce((a, b) => subCategories[a] > subCategories[b] ? a : b));
}

export function findMostProfitableProduct(receipts) {
    const products = receipts.filter(item=>item.active).reduce((acc, receipt) => {
        receipt.cart.forEach(item => {
            const productId = item.id;
            acc[productId] = (acc[productId] || 0) + item.quantity * (item.price - item.discountedPrice);
        });
        return acc;
    }, {});

    return parseInt(Object.keys(products).reduce((a, b) => products[a] > products[b] ? a : b));
}

export function findMostRefundedProducts(receipts) {
    const activeReceipts = receipts.filter(item => item.active && item.refund);
    const inactiveReceipts = receipts.filter(item => !item.active && !item.refund);

    const activeProducts = activeReceipts.flatMap(receipt => receipt.cart);
    const inactiveProducts = inactiveReceipts.flatMap(receipt => receipt.cart);
    const differentProducts = [];

    inactiveProducts.forEach((productB) => {
        const productA = activeProducts.find((item) => item.id === productB.id);

        if (!productA) {
            differentProducts.push({ ...productB });
        } else if (productA.quantity < productB.quantity) {
            const difference = productB.quantity - productA.quantity;
            differentProducts.push({ ...productB, quantity: difference });
        }
    });


    let maxQuantity = 0;
    let maxQuantityIds = [];
    let quantityMap = {};

    for (const product of differentProducts) {
        if (product.quantity > maxQuantity) {
            maxQuantity = product.quantity;
            maxQuantityIds = [product.id];
        } else if (product.quantity === maxQuantity) {
            maxQuantityIds.push(product.id);
        }
    }

    for (const productId of maxQuantityIds) {
        if (quantityMap[productId]) {
            quantityMap[productId]++;
        } else {
            quantityMap[productId] = 1;
        }
    }

    return({
        refundedProducts: Object.keys(quantityMap).map(id => parseInt(id)),
        quantity: maxQuantity
    })
}


export function findMostSoldHour(receipts) {
    const hourCounts = {};

    receipts.forEach(receipt => {
        const date = new Date(receipt.date);
        const hour = date.getHours();

        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    let mostSoldHour = null;
    let maxCount = 0;

    for (const hour in hourCounts) {
        if (hourCounts.hasOwnProperty(hour)) {
            if (hourCounts[hour] > maxCount) {
                mostSoldHour = hour;
                maxCount = hourCounts[hour];
            }
        }
    }

    return parseInt(mostSoldHour);
}

export function findLeastSoldHour(receipts) {
    const hourCounts = {};

    receipts.forEach(receipt => {
        const date = new Date(receipt.date);
        const hour = date.getHours();

        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    let leastSoldHour = null;
    let minCount = Infinity;

    for (const hour in hourCounts) {
        if (hourCounts.hasOwnProperty(hour)) {
            if (hourCounts[hour] < minCount) {
                leastSoldHour = hour;
                minCount = hourCounts[hour];
            }
        }
    }

    return parseInt(leastSoldHour);
}


export function filterReceiptsByDate(_receipts, _filterType,_case=1) {
    const receipts = _receipts.filter(data=>data.case = _case)
    const referenceDate = new Date();

    let startDate, endDate;
    switch (_filterType) {
        case 'hourly':
            startDate = new Date(referenceDate);
            startDate.setHours(referenceDate.getHours() - 1);
            endDate = new Date(referenceDate);
            break;
        case 'daily':
            startDate = new Date(referenceDate);
            startDate.setDate(referenceDate.getDate() - 1);
            endDate = new Date(referenceDate);
            break;
        case 'monthly':
            startDate = new Date(referenceDate);
            startDate.setMonth(referenceDate.getMonth() - 1);
            endDate = new Date(referenceDate);
            break;
        case 'yearly':
            startDate = new Date(referenceDate);
            startDate.setFullYear(referenceDate.getFullYear() - 1);
            endDate = new Date(referenceDate);
            break;
        default:
            startDate = new Date(0);
            endDate = new Date();
            break;
    }

    return receipts.filter(receipt => {
        const receiptDate = new Date(receipt.date);
        return receiptDate >= startDate && receiptDate <= endDate;
    });
}