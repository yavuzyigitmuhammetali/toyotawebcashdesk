import axios from "axios";

export function postTransaction(data) {
    return axios.post("/api/v1/deneme",data)
}