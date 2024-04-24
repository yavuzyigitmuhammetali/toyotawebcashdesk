import axios from "axios";
import config from "../../config.json";

const apiClient = axios.create({
    baseURL: config.apiBaseUrl
});

export function updateProduct(productId, product) {
    return apiClient.patch(`${config.apiEndpoints.products}/${productId}`, product)
}
