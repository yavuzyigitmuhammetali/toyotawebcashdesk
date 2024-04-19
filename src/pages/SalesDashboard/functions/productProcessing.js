/**
 * Filters products based on category and subcategory.
 * @param {Array} data - The array of products to filter.
 * @param {string} category - The category ID to filter by.
 * @param {string} subcategory - The subcategory ID to filter by.
 * @returns {Array} - The filtered array of products.
 */
export function filterProducts(data, category, subcategory) {
    return data.filter(product =>
        (!category || product.categoryId === category) &&
        (!subcategory || product.subCategoryId === subcategory)
    );
}

/**
 * Filters subcategories based on category ID.
 * @param {Array} subcategories - The array of subcategories to filter.
 * @param {string} categoryID - The category ID to filter by.
 * @returns {Array} - The filtered array of subcategories.
 */
export function filterSubcategories(subcategories, categoryID) {
    if (!categoryID) {
        return subcategories.filter(subcategory => subcategory.categoryId === categoryID);
    } else {
        return subcategories.filter(category => category.categoryId === categoryID);
    }
}

/**
 * Filters products based on barcode prefix.
 * @param {Array} products - The array of products to filter.
 * @param {string} barcodePrefix - The prefix to filter by.
 * @returns {Array} - The filtered array of products.
 */
export function filterProductsByBarcode(products, barcodePrefix) {
    const filteredProducts = [];

    for (const product of products) {
        if (product.barcode.toString().startsWith(barcodePrefix)) {
            filteredProducts.push(product);
        }
    }

    return filteredProducts;
}

/**
 * Applies Buy 3 Pay 2 promotion.
 * @param {number} unitPrice - The unit price of the product.
 * @param {number} quantity - The quantity of products.
 * @param {boolean} active - Flag indicating if the promotion is active.
 * @returns {number} - The discounted price after applying the promotion.
 */
export function applyBuy3Pay2(unitPrice, quantity, active = true) {
    if (quantity < 3 || !active) {
        return 0;
    }
    const freeProducts = Math.floor(quantity / 3);
    const totalPayable = (quantity - freeProducts) * unitPrice;
    const averagePricePerProduct = totalPayable / quantity;
    return Math.round(averagePricePerProduct * 100) / 100
}

/**
 * Applies student tax exemption.
 * @param {number} priceWithTax - The price including tax.
 * @param {number} taxRatePercent - The tax rate percentage.
 * @param {boolean} active - Flag indicating if the tax exemption is active.
 * @returns {number} - The price after tax exemption.
 */
export function applyStudentTaxFree(priceWithTax, taxRatePercent, active = true) {
    if (!active) {
        return 0;
    }
    const taxRate = taxRatePercent / 100;
    return Math.round(priceWithTax / (1 + taxRate) * 100) / 100;
}

/**
 * Applies a percentage discount to the price.
 * @param {number} price - The original price.
 * @param {number} discountPercentage - The percentage of discount to apply.
 * @param {boolean} active - Flag indicating if the discount is active.
 * @returns {number} - The discounted price after applying the percentage discount.
 */
export function applyPerCentDiscount(price, discountPercentage, active = true) {
    if (price <= 0 || discountPercentage < 0 || discountPercentage > 100 || !active) {
        return 0;
    }

    const discountAmount = price * (discountPercentage / 100);
    return Math.round((price - discountAmount) * 100) / 100;
}

/**
 * Calculates the tax amount based on inclusive price and tax percentage.
 * @param {number} inclusivePrice - The price including tax.
 * @param {number} taxPercentage - The tax rate percentage.
 * @returns {number} - The calculated tax amount.
 */
export function calculateTaxAmount(inclusivePrice, taxPercentage) {
    const taxRate = taxPercentage / 100;
    const exclusivePrice = inclusivePrice / (1 + taxRate);
    return inclusivePrice - exclusivePrice;
}

/**
 * Calculates subtotal, total, and tax based on the items in the cart.
 * @param {Array} cart - The array of items in the cart.
 * @returns {Object} - An object containing subtotal, total, and tax amounts.
 */
export function calculateSubtotalAndTotal(cart) {
    let subtotal = 0;
    let total = 0;
    let tax = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        total += (item.discountedPrice > 0 ? item.discountedPrice : item.price) * item.quantity;
        tax += calculateTaxAmount((item.discountedPrice > 0 ? item.discountedPrice : item.price), (item.tax)) * item.quantity;
    });
    return {
        subtotal: Math.round(subtotal * 100) / 100,
        total: Math.round(total * 100) / 100,
        tax: Math.round(tax * 100) / 100
    };
}
