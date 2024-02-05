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
