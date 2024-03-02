import axios from "axios";

export function postTransaction(data) {
    return axios.post("/api/v1/receipts",data)
}

export async function updateStockAPI(productId, stock){
    try {
        const response = await axios.patch(`/api/v1/products/${productId}`, {
            stock: stock
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}