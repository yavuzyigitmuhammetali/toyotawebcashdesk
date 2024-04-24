import axios from "axios";
import config from "../../config.json";

const apiClient = axios.create({
    baseURL: config.apiBaseUrl
});

export function postTransaction(data) {
    return apiClient.post(config.apiEndpoints.receipts, data)
}

export async function updateStockAPI(productId, stock) {
    try {
        const response = await apiClient.patch(`${config.apiEndpoints.products}/${productId}`, {
            stock: stock
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}