import axios from "axios";
import config from "../../config.json";

const apiClient = axios.create({
    baseURL: config.apiBaseUrl
});

export function postReceipt(data) {
    return apiClient.post(config.apiEndpoints.receipts, data)
}

export function inactivateReceipt(receiptNumber) {
    return apiClient.patch(`${config.apiEndpoints.receipts}/${receiptNumber}`, {active: false})
}