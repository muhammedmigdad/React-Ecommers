import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../compontents/services/axios'; // Your Axios instance
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../compontents/ProductItem'; // Assuming you have this

function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authToken } = useContext(ShopContext); // Assuming you store the token in context

    useEffect(() => {
        const fetchWishlist = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axiosInstance.get('/wishlist/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Or however you store your token
                    },
                });
                setWishlistItems(response.data);
            } catch (err) {
                console.error("Error fetching wishlist:", err);
                setError("Failed to load wishlist.");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [authToken]); // Re-fetch if the auth token changes

    const handleRemoveFromWishlist = async (productId) => {
        try {
            const response = await axiosInstance.post(`/toggle_wishlist/${productId}/`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            if (!response.data.in_wishlist) {
                setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            alert("Failed to remove from wishlist.");
        }
    };

    if (loading) {
        return <div>Loading your wishlist...</div>;
    }

    if (error) {
        return <div>Error loading wishlist: {error}</div>;
    }

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-6">Your Wishlist</h2>
            {wishlistItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistItems.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <ProductItem
                                name={item.name}
                                id={item.id}
                                price={item.sale_price || item.regular_price}
                                image={item.mainimage}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600">${item.sale_price || item.regular_price}</p>
                                <button
                                    onClick={() => handleRemoveFromWishlist(item.id)}
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Remove
                                </button>
                                {/* Optionally add an "Add to Cart" button here */}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
}

export default Wishlist;
