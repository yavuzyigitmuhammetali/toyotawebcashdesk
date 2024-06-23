import axios from "axios";
import config from "../../config.json";

const apiBaseUrl = config.apiBaseUrl;

export async function sendProduct(data) {
    try {
        const response = await axios.post(`${apiBaseUrl}${config.apiEndpoints.products}`, data);
        return response.data;
    } catch (error) {
        console.error('Error sending product:', error);
        throw error;
    }
}