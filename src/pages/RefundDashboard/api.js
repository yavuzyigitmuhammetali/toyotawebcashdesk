import axios from "axios";

export function postReceipt(data) {
    return axios.post("/api/v1/receipts", data)
}

export function inactivateReceipt(receiptNumber) {
    return axios.patch(`/api/v1/receipts/${receiptNumber}`, {active: false})
}