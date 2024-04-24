import axios from "axios";
import config from "../../config.json";

const apiClient = axios.create({
    baseURL: config.apiBaseUrl
});

export function sendProduct(data) {
    return apiClient.post(config.apiEndpoints.products, data).catch(reason => console.error(reason));
}

