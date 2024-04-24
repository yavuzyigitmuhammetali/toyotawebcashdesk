import config from "../config.json";

export const getPageTitleAndLink = (pathname, t, productId, receiptNumber, pathHistory) => {
    let pageTitle, prevLink;
    switch (pathname) {
        case "/":
            pageTitle = t("homepage");
            prevLink = "/";
            break;
        case "/order/create":
            pageTitle = t("orderCreationScreen");
            prevLink = "/";
            break;
        case "/order/payment":
            pageTitle = t("paymentScreen");
            prevLink = "/order/create";
            break;
        case "/purchase/list":
            pageTitle = t("receipts");
            prevLink = "/";
            break;
        case "/refund/create":
            pageTitle = t("returnScreen");
            prevLink = "/";
            break;
        case "/products/list":
        case "/products/list/":
            pageTitle = t("productListingScreen");
            prevLink = "/";
            break;
        case "/product/add":
            pageTitle = t("productAddScreen");
            prevLink = "/";
            break;
        case "/summary/calculate":
            pageTitle = t("reports");
            prevLink = "/";
            break;
        default:
            if (pathname.startsWith("/products/list/")) {
                pageTitle = t("viewingProduct") + ": " + productId;
                prevLink = pathHistory[pathHistory.length - 2] === "/summary/calculate" ? "/summary/calculate" : "/products/list";
            } else if (pathname.startsWith("/receipt/")) {
                pageTitle = t("receiptNumber") + ": " + receiptNumber;
                prevLink = pathHistory[pathHistory.length - 2] === "/purchase/list" ? "/purchase/list" : "/";
            } else {
                pageTitle = t("title");
                prevLink = "/";
            }
    }
    document.title = config.storeName + " • " + pageTitle;
    return {pageTitle, prevLink};
};

