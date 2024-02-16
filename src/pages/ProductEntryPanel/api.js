import axios from "axios";

export function getCategories(){
    return axios.get("/api/v1/categories")
}

export function getSubCategories(){
    return axios.get("/api/v1/subcategories")
}

export function getProducts(){
    return axios.get("/api/v1/products")
}

export function sendProduct(data){
    return axios.post("/api/v1/products",data).catch(reason => console.log(reason));
}