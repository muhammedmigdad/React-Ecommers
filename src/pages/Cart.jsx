import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../compontents/Title';
import CartTotal from '../compontents/CartTotel';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from '../compontents/services/axios';

const Cart = () => {
    const {
        cartItems,
        currency,
        updateQuantity,
        cartTotal: contextCartTotal,
        loadingProducts,
        error: contextError,
        setCartItems
    } = useContext(ShopContext);

    const [cartDetails, setCartDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token || token === "undefined") {
                throw new Error('No access token found');
            }

            const response = await axios.get('/cart/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

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
            setCartItems(syncedCartItems);

        } catch (err) {
            if (err.response?.status === 401 || err.message === 'No access token found') {
                setError('Session expired. Please log in again');
                toast.error('You need to log in first');
                localStorage.removeItem('access_token');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(err.response?.data?.error || 'Failed to load cart details');
                toast.error(err.response?.data?.error || 'Error loading cart');
            }
            throw err;
        }
    };

    useEffect(() => {
        const loadCart = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token || token === "undefined") {
                    throw new Error('No access token found');
                }
                setLoading(true);
                await fetchCart();
            } catch (err) {
                // Already handled in fetchCart
            } finally {
                setLoading(false);
            }
        };

        if (loadingProducts) return;

        if (contextError) {
            setError(contextError);
            setLoading(false);
            return;
        }

        loadCart();
    }, [loadingProducts, contextError, setCartItems, navigate]);

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
            const token = localStorage.getItem('access_token');
            if (!token || token === "undefined") {
                throw new Error('No access token found');
            }

            if (numValue === 0) {
                await axios.delete(`/cart/remove/${cartItem.id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success('Item removed from cart');
                setCartDetails(cartDetails.filter(item => item.id !== cartItem.id));
            } else {
                await axios.put(`/cart/update/${cartItem.id}/`, 
                    { quantity: numValue },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                toast.success('Cart updated');
                setCartDetails(cartDetails.map(item =>
                    item.id === cartItem.id ? { ...item, quantity: numValue } : item
                ));
            }
        } catch (err) {
            updateQuantity(productId, size, prevQuantity);
            if (err.response?.status === 401 || err.message === 'No access token found') {
                toast.error('Session expired. Please log in again');
                localStorage.removeItem('access_token');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(err.response?.data?.error || 'Failed to update cart');
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
                            {/* You can render product info here */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.product.mainimage}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p>{item.product.name}</p>
                                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                                </div>
                            </div>
                            <input
                                type="number"
                                min="0"
                                value={item.quantity}
                                onChange={(e) =>
                                    handleQuantityChange(item.product.id, item.size, e.target.value)
                                }
                                className="border p-2 w-full text-center"
                            />
                            <p>{currency}{item.price}</p>
                        </div>
                    ))
                )}
            </div>

            {cartDetails.length > 0 && (
                <div className="flex justify-end my-20">
                    <div className="w-full sm:w-[450px]">
                        <CartTotal cartTotal={contextCartTotal} />
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
