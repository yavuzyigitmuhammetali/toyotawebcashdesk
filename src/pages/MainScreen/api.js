import axios from "axios";
export function getIp(){
    return axios.get('https://api.ipify.org?format=json')
}