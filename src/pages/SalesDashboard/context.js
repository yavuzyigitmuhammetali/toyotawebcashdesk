import React from "react";
import {
    applyBuy3Pay2,
    applyPerCentDiscount,
    applyStudentTaxFree,
    calculateSubtotalAndTotal
} from "./functions/productProcessing";
import AppDataContext from "../../shared/state/AppData/context";
import {defaultProduct} from "../../shared/state/AppData/defaultData";


const CartContext = React.createContext(undefined);

const CartProvider = ({children}) => {
    const [cart, setCart] = React.useState([])
    const {products: _products, categories, subCategories, fetchProducts} = React.useContext(AppDataContext);
    const [products, setProducts] = React.useState([defaultProduct])
    const [total, setTotal] = React.useState(0)
    const [subTotal, setSubTotal] = React.useState(0)
    const [tax, setTax] = React.useState(0);
    const [discounts, setDiscounts] = React.useState({
        buy3pay2: false, studentTaxFree: false, percentageDiscounts: false
    })


    const totalCampaignQuantity = React.useMemo(() =>
            cart.filter(item => item.campaign).reduce((acc, item) => acc + item.quantity, 0),
        [cart]
    );

    React.useEffect(() => {
        updateDiscountedPrices();
    }, [totalCampaignQuantity, discounts]);

    const totalQuantity = React.useMemo(() =>
            cart.reduce((acc, item) => acc + item.quantity, 0),
        [cart]
    );
    React.useEffect(() => {
        const {subtotal, total, tax} = calculateSubtotalAndTotal(cart);
        setTotal(total);
        setTax(tax);
        setSubTotal(subtotal);
    }, [totalQuantity, discounts]);

    React.useEffect(() => {
        fetchProducts().then(() => {
            setProducts(_products);
        })
        const salesDataString = sessionStorage.getItem('salesData')
        if (salesDataString) {
            const {cart, discounts} = JSON.parse(salesDataString)
            setDiscounts(discounts)
            setCart(cart);
        }
    }, []);


    const filteredCartQuantity = React.useMemo(() =>
            cart.reduce((total, item) => item.fraction ? total : total + item.quantity, 0),
        [cart]
    );
    React.useEffect(() => {
        const result = Object.values(cart.reduce((acc, {id, quantity}) => {
            acc[id] = acc[id] || {id, quantity: 0};
            acc[id].quantity += quantity;
            return acc;
        }, {}))

        const updatedProducts = _products.map(product => {
            const updateItem = result.find(item => item.id === product.id);
            if (updateItem) {
                return {
                    ...product,
                    stock: product.stock - updateItem.quantity
                };
            }
            return product;
        });
        setProducts(updatedProducts);
    }, [filteredCartQuantity]);


    const toggleDiscounts = React.useCallback((discountKey) => {
        setDiscounts(prevDiscounts => ({
            ...prevDiscounts,
            [discountKey]: !prevDiscounts[discountKey]
        }));
    }, [setDiscounts]);

    const addToCart = React.useCallback((product) => {
        if (!product) return;
        setCart(currentCart => {
            const productIndex = currentCart.findIndex(item => item.id === product.id);
            if (productIndex > -1 && !product.fraction) {
                const updatedCart = [...currentCart];
                updatedCart[productIndex] = {
                    ...updatedCart[productIndex],
                    quantity: (updatedCart[productIndex].stock > updatedCart[productIndex].quantity) ? (updatedCart[productIndex].quantity + 1) : (updatedCart[productIndex].quantity)
                };
                return updatedCart;
            } else if (product.fraction) {
                const fractionQuantity = currentCart.filter(value => value.id === product.id).reduce((previousValue, currentValue) => previousValue + currentValue?.quantity, 0)
                return fractionQuantity < product.stock ? [...currentCart, {
                    ...product,
                    quantity: 0.01,
                    discountedPrice: 0
                }] : currentCart;
            } else if (product.stock > 0) {
                return [...currentCart, {...product, quantity: 1, discountedPrice: 0}];
            } else {
                return currentCart;
            }
        });
    }, [setCart]);

    const decreaseQuantityByIndex = React.useCallback((index) => {
        setCart(currentCart => currentCart.map((item, idx) => idx === index && item.quantity > 1 ? {
            ...item, quantity: item.quantity - 1
        } : item));
    }, [setCart]);

    const increaseQuantityByIndex = React.useCallback((index) => {
        setCart(currentCart => currentCart.map((item, idx) => idx === index && item.quantity < item.stock ? {
            ...item, quantity: item.quantity + 1
        } : item));
    }, [setCart]);

    const removeFromCartByIndex = React.useCallback((index) => {
        if (index < 0 || index >= cart.length) return;
        setCart(currentCart => currentCart.filter((_, i) => i !== index));
    }, [cart.length, setCart]);

    const increaseQuantityDecimalByIndex = React.useCallback((index, decimal) => {
        setCart(currentCart => {
            if (index < 0 || index >= currentCart.length) {
                return currentCart;
            }

            const fractionQuantity = currentCart.filter((value, idx) => value.id === currentCart[index]?.id && idx !== index).reduce((previousValue, currentValue) => previousValue + currentValue?.quantity, 0);

            if (decimal >= 0.01) {
                return currentCart.map((item, i) => {
                    if (i === index && (parseFloat(decimal) + fractionQuantity) <= item.stock && item.fraction) {
                        const roundedDecimal = Math.round(decimal * 100) / 100;
                        return {
                            ...item,
                            quantity: Math.round(roundedDecimal * 100) / 100
                        };
                    } else {
                        return item;
                    }
                });
            } else {
                return currentCart;
            }
        });
    }, [setCart]);


    const updateDiscountedPrices = React.useCallback(() => {
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
    }, [cart, discounts.buy3pay2, discounts.studentTaxFree, discounts.percentageDiscounts, setCart]);

    const cancelTransaction = () => {
        setCart([]);
        setTotal(0);
        setSubTotal(0);
        setTax(0);
        setDiscounts({buy3pay2: false, studentTaxFree: false, percentageDiscounts: false})
        sessionStorage.removeItem('salesData');
        sessionStorage.removeItem('paymentTransactions');
    }

    const confirmCart = () => {
        if (total && subTotal && cart.length) {
            const data = {
                total,
                subTotal,
                cart,
                tax,
                discounts
            }
            sessionStorage.setItem('salesData', JSON.stringify(data));
            return true;
        } else {
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
            tax,
            cart,
            discounts,
            addToCart,
            decreaseQuantityByIndex,
            increaseQuantityByIndex,
            removeFromCartByIndex,
            increaseQuantityDecimalByIndex,
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
