import axios from "axios";
import config from "../../../config.json";

const apiBaseUrl = config.apiBaseUrl;

export function login(body) {
    return axios.post(apiBaseUrl + config.apiEndpoints.login, body);
}

export function getStatus() {
    return axios.get(apiBaseUrl + config.apiEndpoints.status);
}

export function testLogin() {
    return axios.get(apiBaseUrl + config.apiEndpoints.test);
}

export function getIp() {
    return axios.get(config.externalEndpoints.ipify);
}

