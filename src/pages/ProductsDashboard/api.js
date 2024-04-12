import axios from "axios";

export function updateProduct(productId, product) {
    return axios.patch(`/api/v1/products/${productId}`, product)
}
