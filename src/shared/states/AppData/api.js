import axios from "axios";
import config from "../../../config.json";

const apiBaseUrl = config.apiBaseUrl;


export function getCategories(query = "") {
    return axios.get(apiBaseUrl + config.apiEndpoints.categories + query)
}

export function getSubCategories(query = "") {
    return axios.get(apiBaseUrl + config.apiEndpoints.subcategories + query)
}

export function getProducts(query = "") {
    return axios.get(apiBaseUrl + config.apiEndpoints.products + query)
}

export function getReceipts(query = "") {
    return axios.get(apiBaseUrl + config.apiEndpoints.receipts + query)
}