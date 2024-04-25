import axios from "axios";
import config from "../../config.json";

const apiBaseUrl = config.apiBaseUrl;

export function postTransaction(data) {
    return axios.post(apiBaseUrl + config.apiEndpoints.receipts, data)
}

export async function updateStockAPI(productId, stock) {
    try {
        const response = await axios.patch(`${apiBaseUrl + config.apiEndpoints.products}/${productId}`, {
            stock: stock
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}