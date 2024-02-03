import axios from "axios";

export function getStatus(){
    return axios.get('/api/v1/getstatus');
}

export function getIp(){
    return axios.get('https://api.ipify.org?format=json')
}