export function filterProducts(data, category, subcategory) {
    return data.filter(product =>
        (!category || product.categoryId === category) &&
        (!subcategory || product.subCategoryId === subcategory)
    );
}

export function filterSubcategories(subcategories, categoryID) {
    if (!categoryID) {
        return subcategories.filter(subcategory => subcategory.categoryId === categoryID);
    } else {
        return subcategories.filter(category => category.categoryId === categoryID);
    }
}

export function filterProductsByBarcode(products, barcodePrefix) {
    const filteredProducts = [];

    for (const product of products) {
        if (product.barcode.toString().startsWith(barcodePrefix)) {
            filteredProducts.push(product);
        }
    }

    return filteredProducts;
}

export function applyBuy3Pay2(unitPrice, quantity, active = true) {
    if (quantity < 3 || !active) {
        return 0;
    }
    const freeProducts = Math.floor(quantity / 3);
    const totalPayable = (quantity - freeProducts) * unitPrice;
    const averagePricePerProduct = totalPayable / quantity;
    return Math.round(averagePricePerProduct * 100) / 100
}

export function applyStudentTaxFree(priceWithTax, taxRatePercent, active = true) {
    if (!active) {
        return 0;
    }
    const taxRate = taxRatePercent / 100;
    return Math.round(priceWithTax / (1 + taxRate) * 100) / 100;
}

export function applyPerCentDiscount(price, discountPercentage, active = true) {
    if (price <= 0 || discountPercentage < 0 || discountPercentage > 100 || !active) {
        return 0;
    }

    const discountAmount = price * (discountPercentage / 100);
    return Math.round((price - discountAmount) * 100) / 100;
}


export function calculateTaxAmount(inclusivePrice, taxPercentage) {
    const taxRate = taxPercentage / 100;
    const exclusivePrice = inclusivePrice / (1 + taxRate);
    return inclusivePrice - exclusivePrice;
}

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

