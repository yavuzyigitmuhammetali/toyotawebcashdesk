import axios from "axios";
import config from "../../../config.json";

const apiClient = axios.create({
    baseURL: config.apiBaseUrl
});

export function login(body) {
    return apiClient.post(config.apiEndpoints.login, body);
}

export function getStatus() {
    return apiClient.get(config.apiEndpoints.status);
}

export function testLogin() {
    return apiClient.get(config.apiEndpoints.test);
}

export function getIp() {
    return axios.get(config.externalEndpoints.ipify);
}

