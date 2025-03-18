import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../compontents/data/index.js"; // Ensure correct path

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(); 
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        loadProducts(); // ✅ Fetch products only once on mount
    }, []); // ✅ Removed `products` from dependency array

    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error('Select product size');
            return;
        }

        setCartItems((prevCart) => {
            const newCart = { ...prevCart };
            if (!newCart[itemId]) newCart[itemId] = {};
            newCart[itemId][size] = (newCart[itemId][size] || 0) + 1;
            return newCart;
        });
    };

    const getCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const itemInfo = products.find((p) => p._id === itemId); // ✅ Ensure consistency with `_id`
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
            if (newCart[itemId]) {
                newCart[itemId][size] = quantity;
            }
            return newCart;
        });
    };

    return (
        <ShopContext.Provider value={{ 
            products, setProducts, currency, delivery_fee, search, setSearch, 
            showSearch, setShowSearch, cartItems, addToCart, getCartCount, 
            updateQuantity, getCartAmount, navigate 
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
