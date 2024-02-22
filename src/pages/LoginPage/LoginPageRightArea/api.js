import axios from "axios";

export function login(body){
    return axios.post("/api/v1/login", body);
}