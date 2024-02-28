import axios from "axios";

export function sendProduct(data){
    return axios.post("/api/v1/products",data).catch(reason => console.log(reason));
}