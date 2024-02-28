import React, {useContext} from "react";
import {
    applyBuy3Pay2, applyPerCentDiscount, applyStudentTaxFree, calculateSubtotalAndTotal
} from "./functions/productProcessing";
import AppDataContext from "../../shared/state/AppData/context";


const CartContext = React.createContext(undefined);

const CartProvider = ({children}) => {
    const [cart, setCart] = React.useState([])
    const {products,categories,subCategories} = useContext(AppDataContext);
    const [total, setTotal] = React.useState(0)
    const [subTotal, setSubTotal] = React.useState(0)
    const [discounts, setDiscounts] = React.useState({
        buy3pay2: false, studentTaxFree: false, percentageDiscounts: false
    })

    const toggleDiscounts = (discountKey) => {
        setDiscounts(prevDiscounts => ({
            ...prevDiscounts, [discountKey]: !prevDiscounts[discountKey]
        }));
    }

    const addToCart = (product) => {
        setCart(currentCart => {
            const productIndex = currentCart.findIndex(item => item.id === product.id);

            if (productIndex > -1) {
                const updatedCart = [...currentCart];
                updatedCart[productIndex] = {
                    ...updatedCart[productIndex],
                    quantity: (updatedCart[productIndex].stock > updatedCart[productIndex].quantity) ? (updatedCart[productIndex].quantity + 1) : (updatedCart[productIndex].quantity)
                };
                return updatedCart;
            } else {
                return [...currentCart, {...product, quantity: 1, discountedPrice: 0}];
            }
        });
    };

    const decreaseQuantityById = (id) => {
        setCart(currentCart => currentCart.map(item => item.id === id && item.quantity > 1 ? {
            ...item, quantity: item.quantity - 1
        } : item));
    };

    const increaseQuantityById = (id) => {
        setCart(currentCart => currentCart.map(item => item.id === id && item.quantity < item.stock ? {
            ...item, quantity: item.quantity + 1
        } : item));
    };

    const removeFromCartById = (id) => {
        setCart(currentCart => currentCart.filter(item => item.id !== id));
    };

    const updateDiscountedPrices = () => {
        const updatedCart = cart.map(item => {
            if (item.campaign) {
                switch (item.campaign) {
                    case 'buy3pay2':
                        item.discountedPrice = applyBuy3Pay2(item.price, item.quantity, discounts.buy3pay2);
                        break;
                    case 'studentTaxFree':
                        if (discounts.studentTaxFree) {
                            if (!item.discountedPrice) {
                                item.discountedPrice = applyStudentTaxFree(item.price, item.tax, discounts.studentTaxFree);
                                item.tax = 0;
                                item.quantity = 1;
                            } else {
                                item.quantity = 1;
                            }
                        }
                        break;
                    case '-20%':
                        item.discountedPrice = applyPerCentDiscount(item.price, 20, discounts.percentageDiscounts);
                        break;
                    default:
                }
            }
            return item;
        });
        setCart(updatedCart);
    };
    const totalCampaignQuantity = cart.filter(item => item.campaign).map(item => item.quantity).reduce((acc, quantity) => acc + quantity, 0)
    React.useEffect(() => {
        updateDiscountedPrices();
    }, [totalCampaignQuantity, discounts]);

    const totalQuantity = cart.map(item => item.quantity).reduce((acc, quantity) => acc + quantity, 0)
    React.useEffect(() => {
        const {subtotal, total} = calculateSubtotalAndTotal(cart);
        setTotal(total);
        setSubTotal(subtotal);
    }, [totalQuantity, discounts]);

    React.useEffect(() => {
        const salesDataString = localStorage.getItem('salesData')
        if (salesDataString){
            const {cart} = JSON.parse(salesDataString)
            setCart(cart);
        }
    }, []);


    const cancelTransaction = ()=>{
        setCart([]);
        setTotal(0);
        setSubTotal(0);
        setDiscounts({buy3pay2: false, studentTaxFree: false, percentageDiscounts: false})
        localStorage.removeItem('salesData');
        localStorage.removeItem('paymentTransactions');
    }

    const confirmCart = ()=>{
        if (total&&subTotal&&cart.length){
            const data = {
                total,
                subTotal,
                cart
            }
            localStorage.setItem('salesData', JSON.stringify(data));
            return true;
        }else {
            return false;
        }
    }

    return (<CartContext.Provider
        value={{
            categories,
            subCategories,
            products,
            total,
            subTotal,
            cart,
            discounts,
            addToCart,
            decreaseQuantityById,
            increaseQuantityById,
            removeFromCartById,
            toggleDiscounts,
            cancelTransaction,
            confirmCart
        }}
    >
        {children}
    </CartContext.Provider>);
};

export default CartContext;
export {CartProvider};
