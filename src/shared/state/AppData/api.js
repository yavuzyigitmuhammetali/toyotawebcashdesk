import axios from "axios";

export function getCategories(query=""){
    return axios.get("/api/v1/categories/"+query)
}

export function getSubCategories(query=""){
    return axios.get("/api/v1/subcategories/"+query)
}

export function getProducts(query=""){
    return axios.get("/api/v1/products/"+query)
}
export function getReceipts(query=""){
    return axios.get("/api/v1/receipts/"+query)
}