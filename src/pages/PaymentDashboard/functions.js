import {updateStockAPI} from "./api";

/**
 * Updates the stock of products in the cart by calling the updateStockAPI function for each item.
 * @param {Array} cart - The cart containing items to update stock for.
 */
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