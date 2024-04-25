import axios from "axios";
import config from "../../config.json";

const apiBaseUrl = config.apiBaseUrl;

export function updateProduct(productId, product) {
    return axios.patch(`${apiBaseUrl + config.apiEndpoints.products}/${productId}`, product)
}
