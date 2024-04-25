import axios from "axios";
import config from "../../config.json";

const apiBaseUrl = config.apiBaseUrl;

export function postReceipt(data) {
    return axios.post(apiBaseUrl + config.apiEndpoints.receipts, data)
}

export function inactivateReceipt(receiptNumber) {
    return axios.patch(`${apiBaseUrl + config.apiEndpoints.receipts}/${receiptNumber}`, {active: false})
}