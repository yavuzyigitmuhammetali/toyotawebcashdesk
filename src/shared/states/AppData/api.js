import axios from "axios";
import config from "../../../config.json";

const apiClient = axios.create({
    baseURL: config.apiBaseUrl
});

export function getCategories(query = "") {
    return apiClient.get(config.apiEndpoints.categories + query)
}

export function getSubCategories(query = "") {
    return apiClient.get(config.apiEndpoints.subcategories + query)
}

export function getProducts(query = "") {
    return apiClient.get(config.apiEndpoints.products + query)
}

export function getReceipts(query = "") {
    return apiClient.get(config.apiEndpoints.receipts + query)
}