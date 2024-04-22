export const defaultReceipt =
    {
        receiptNumber: "",
        active: true,
        storeNumber: "",
        case: 0,
        "cashierName": "",
        "cashierNumber": 0,
        date: "2000-01-01T00:00:00.000Z",
        total: 0,
        subTotal: 0,
        amountPaid: 0,
        totalTax: 0,
        change: 0,
        cart: [
            {
                id: 0,
                barcode: 0,
                name: "",
                stock: 0,
                price: 0,
                tax: 0,
                campaign: "",
                isFavourite: false,
                image: "",
                categoryId: 0,
                subCategoryId: 0,
                quantity: 0,
                discountedPrice: 0,
                fraction: false
            }
        ],
        transactions: [
            {
                price: 0,
                type: "cash"
            },
            {
                price: 0,
                type: "card"
            }
        ],
        refund: "",
        email: ""
    }
