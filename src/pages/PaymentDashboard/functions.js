import {updateStockAPI} from "./api";

export async function updateStocksFromCart(cart) {
    try {
        const updatePromises = cart.map(item => {
            const {id, quantity, stock} = item;
            return updateStockAPI(id, stock - quantity);
        });
        await Promise.all(updatePromises);
    } catch (error) {
        console.error(error);
    }
}