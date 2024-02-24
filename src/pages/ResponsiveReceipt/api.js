import axios from "axios";

export function getReceipt(receiptNumber){
    return axios.get("/api/v1/deneme/"+receiptNumber)
}