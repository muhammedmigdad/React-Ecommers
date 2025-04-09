// src/context/ShopContext.jsx
import { createContext, useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../compontents/data/index.js"; // Fixed typo

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoadingProducts(true);
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                setError("Failed to load products");
                console.error("Error fetching products:", error);
            } finally {
                setLoadingProducts(false);
            }
        };
        loadProducts();
    }, []);

    const addToCart = (itemId, size, maxQuantity = 10) => {
        if (!size) {
            toast.error('Select product size');
            return;
        }

        const currentQty = cartItems[itemId]?.[size] || 0;
        if (currentQty >= maxQuantity) {
            toast.error(`Maximum quantity (${maxQuantity}) reached`);
            return;
        }

        setCartItems((prevCart) => {
            const newCart = { ...prevCart };
            if (!newCart[itemId]) newCart[itemId] = {};
            newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
            toast.success('Item added to cart');
            return newCart;
        });
    };

    const getCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const itemInfo = products.find((p) => p.id === itemId);
            if (!itemInfo) return total;

            return total + Object.entries(cartItems[itemId]).reduce(
                (sum, [size, qty]) => sum + (itemInfo.sale_price || itemInfo.regular_price) * qty,
                0
            );
        }, 0);
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce(
            (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
            0
        );
    };

    const updateQuantity = (itemId, size, quantity) => {
        setCartItems((prevCart) => {
            const newCart = { ...prevCart };
            if (quantity <= 0) {
                delete newCart[itemId][size];
                if (newCart[itemId] && Object.keys(newCart[itemId]).length === 0) {
                    delete newCart[itemId];
                }
            } else if (newCart[itemId]) {
                newCart[itemId][size] = quantity;
            }
            return { ...newCart };
        });
    };

    const cartTotal = useMemo(() => {
        const item_total = getCartAmount();
        return {
            item_total,
            delivery: delivery_fee,
            total: item_total + delivery_fee
        };
    }, [cartItems, products, delivery_fee]);

    return (
        <ShopContext.Provider value={{
            products,
            setProducts,
            currency,
            delivery_fee,
            search,
            setSearch,
            showSearch,
            setShowSearch,
            cartItems,
            setCartItems, // Added
            addToCart,
            getCartCount,
            updateQuantity,
            getCartAmount,
            navigate,
            cartTotal,
            loadingProducts,
            error
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;