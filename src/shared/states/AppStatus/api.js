import axios from "axios";

const apiClient = axios.create({
    baseURL: "/api/v1"
});

export function login(body) {
    return apiClient.post("/login", body);
}

export function getStatus() {
    return apiClient.get("/status");
}

export function testLogin() {
    return apiClient.get("/test");
}

export function getIp() {
    return axios.get('https://api.ipify.org?format=json');
}

