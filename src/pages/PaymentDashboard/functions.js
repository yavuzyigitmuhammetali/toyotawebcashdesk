import {updateStockAPI} from "./api";

export async function updateStocksFromCart(cart) {
    try {
        for (const item of cart) {
            const {id, quantity, stock} = item;
            await updateStockAPI(id, stock - quantity);
        }
    } catch (error) {
        console.error(error);
    }
}