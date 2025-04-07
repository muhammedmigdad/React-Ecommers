// src/components/Cart.js
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../compontents/Title'; // Fixed typo
import CartTotal from '../compontents/CartTotel'; // Fixed typo
import { assets } from '../assets/assets';
import axios from '../compontents/services/axios';
import { toast } from 'react-toastify';

const Cart = () => {
    const { 
        cartItems, 
        currency, 
        updateQuantity, 
        navigate, 
        cartTotal,
        loadingProducts,
        error: contextError,
        setCartItems // Add this from ShopContext
    } = useContext(ShopContext);
    const [cartDetails, setCartDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuthAndFetchCart = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError('Please log in to view your cart');
                toast.error('You need to log in first');
                setTimeout(() => navigate('/login'), 2000);
                setLoading(false);
                return;
            }

            if (loadingProducts || contextError) {
                setLoading(false);
                setError(contextError);
                return;
            }

            try {
                const response = await axios.get('/cart/');
                const { cart_items } = response.data;

                const detailedItems = cart_items.map(item => ({
                    id: item.id,
                    product: {
                        id: item.product.id,
                        name: item.product.name || 'Unknown Product',
                        mainimage: item.product.mainimage || '/placeholder.jpg',
                    },
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price
                }));

                setCartDetails(detailedItems);

                const syncedCartItems = {};
                cart_items.forEach(item => {
                    if (!syncedCartItems[item.product.id]) {
                        syncedCartItems[item.product.id] = {};
                    }
                    syncedCartItems[item.product.id][item.size] = item.quantity;
                });
                setCartItems(syncedCartItems); // Sync with context

            } catch (err) {
                if (err.response?.status === 401) {
                    setError('Session expired. Please log in again');
                    toast.error('Session expired. Redirecting to login...');
                    localStorage.removeItem('access_token');
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setError(err.response?.data?.error || 'Failed to load cart details');
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetchCart();
    }, [cartItems, loadingProducts, contextError, navigate, setCartItems]);

    const handleQuantityChange = async (productId, size, value) => {
        const numValue = value === '' ? 0 : Number(value);
        if (numValue < 0) return;

        const cartItem = cartDetails.find(item => 
            item.product.id === productId && item.size === size
        );
        
        if (!cartItem) return;

        const prevQuantity = cartItem.quantity;
        updateQuantity(productId, size, numValue);

        try {
            if (numValue === 0) {
                await axios.delete(`/cart/remove/${cartItem.id}/`);
                toast.success('Item removed from cart');
            } else {
                await axios.put(`/cart/update/${cartItem.id}/`, { quantity: numValue });
                toast.success('Cart updated');
            }
        } catch (err) {
            updateQuantity(productId, size, prevQuantity);
            toast.error(err.response?.data?.error || 'Failed to update cart');
            if (err.response?.status === 401) {
                toast.error('Session expired. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        }
    };

    if (loading) {
        return (
            <div className="border-t pt-14">
                <div className="mb-3 text-2xl">
                    <Title text1={'YOUR'} text2={'CART'} />
                </div>
                <p className="text-gray-500 text-center py-10">Loading cart...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="border-t pt-14">
                <div className="mb-3 text-2xl">
                    <Title text1={'YOUR'} text2={'CART'} />
                </div>
                <p className="text-red-500 text-center py-10">{error}</p>
            </div>
        );
    }

    return (
        <div className="border-t pt-14">
            <div className="mb-3 text-2xl">
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div>
                {cartDetails.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">Your cart is empty</p>
                ) : (
                    cartDetails.map((item) => (
                        <div
                            key={item.id}
                            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 items-center"
                        >
                            <div className="flex items-start gap-6">
                                <img
                                    src={item.product.mainimage || '/placeholder.jpg'}
                                    className="w-16 sm:w-20"
                                    alt={item.product.name}
                                />
                                <div>
                                    <p className="text-xs sm:text-lg font-medium">
                                        {item.product.name}
                                    </p>
                                    <div className="flex items-center mt-2 gap-5">
                                        <p>
                                            {currency}
                                            {item.price.toFixed(2)}
                                        </p>
                                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                                            {item.size.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <input
                                onChange={(e) => handleQuantityChange(item.product.id, item.size, e.target.value)}
                                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                                type="number"
                                min={0}
                                value={item.quantity}
                            />
                            <img
                                onClick={() => handleQuantityChange(item.product.id, item.size, 0)}
                                className="w-4 sm:w-5 cursor-pointer hover:opacity-70"
                                src={assets.bin_icon}
                                alt="Remove"
                            />
                        </div>
                    ))
                )}
            </div>

            {cartDetails.length > 0 && (
                <div className="flex justify-end my-20">
                    <div className="w-full sm:w-[450px]">
                        <CartTotal cartTotal={cartTotal} />
                        <div className="w-full text-end">
                            <button
                                onClick={() => navigate('/placeorder')}
                                className="bg-black text-white rounded-md text-sm my-8 px-8 py-3 hover:bg-gray-800"
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;