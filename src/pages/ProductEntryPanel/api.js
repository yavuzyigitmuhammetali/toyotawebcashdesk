import axios from "axios";
import config from "../../config.json";

const apiBaseUrl = config.apiBaseUrl;

export function sendProduct(data) {
    return axios.post(apiBaseUrl + config.apiEndpoints.products, data).catch(reason => console.error(reason));
}

