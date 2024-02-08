export function filterProducts(data, category, subcategory) {
    if (!category && !subcategory) {
        return [];
    }

    if (category && subcategory) {
        return data.filter(product => product.categoryId === category && product.subCategoryId === subcategory);
    }

    if (category) {
        return data.filter(product => product.categoryId === category);
    }

    if (subcategory) {
        return data.filter(product => product.subCategoryId === subcategory);
    }

    return [];
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

export function applyBuy3Pay2(unitPrice, quantity,active = true) {
    if (quantity<3 || !active){
        return 0;
    }
    const freeProducts = Math.floor(quantity / 3);
    const totalPayable = (quantity - freeProducts) * unitPrice;
    const averagePricePerProduct = totalPayable / quantity;
    return averagePricePerProduct.toFixed(2);
}

export function applyStudentTaxFree(priceWithTax, taxRatePercent,active = true) {
    if (!active){
        return 0;
    }
    const taxRate = taxRatePercent / 100;
    return (priceWithTax / (1 + taxRate)).toFixed(2);
}

export function applyPerCentDiscount(price, discountPercentage,active = true) {
    if (price <= 0 || discountPercentage < 0 || discountPercentage > 100 || !active) {
        return 0;
    }

    const discountAmount = price * (discountPercentage / 100);
    return price - discountAmount;
}

export function calculateSubtotalAndTotal(cart) {
    let subtotal = 0;
    let total = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        total += (item.discountedPrice !== 0 ? item.discountedPrice : item.price) * item.quantity;
    });
    subtotal = subtotal.toFixed(2);
    total = total.toFixed(2);
    return { subtotal, total };
}