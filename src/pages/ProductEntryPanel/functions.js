export function generateBarcode(categoryId, subCategoryId, id) {
    const categoryPart = `${categoryId}`.length === 1 ? `${categoryId}0` : `${categoryId}`;

    let subCategoryPart;
    if (`${subCategoryId}`.length === 1) {
        subCategoryPart = `${subCategoryId}00`;
    } else if (`${subCategoryId}`.length === 2) {
        subCategoryPart = `${subCategoryId}0`;
    } else {
        subCategoryPart = `${subCategoryId}`;
    }

    let idPart;
    switch (`${id}`.length) {
        case 1:
            idPart = `${id}0000`;
            break;
        case 2:
            idPart = `${id}000`;
            break;
        case 3:
            idPart = `${id}00`;
            break;
        case 4:
            idPart = `${id}0`;
            break;
        default:
            idPart = `${id}`;
    }

    const barcode = `${categoryPart}${subCategoryPart}${idPart}`;
    return parseInt(barcode, 10);
}