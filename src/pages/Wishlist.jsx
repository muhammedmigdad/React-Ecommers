import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axiosInstance from "../compontents/services/axios";
import ProductItem from "../compontents/ProductItem";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { addToCart } = useContext(ShopContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Please log in to view your wishlist.");

        const response = await axiosInstance.get("/wishlist/");
        setWishlistItems(response.data);
      } catch (err) {
        setError(err.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await axiosInstance.post(`/toggle_wishlist/${productId}/`);
      if (!response.data.in_wishlist) {
        setWishlistItems((items) => items.filter((item) => item.id !== productId));
        alert(response.data.message || "Item removed from wishlist");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove from wishlist");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500">
          Loading your wishlist...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500">
          {error}
        </motion.p>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-10">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-center mb-8">
        Your Wishlist
      </motion.h2>

      {wishlistItems.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow rounded p-4"
            >
              <ProductItem
                id={item.id}
                name={item.name}
                price={item.sale_price || item.regular_price}
                originalPrice={item.regular_price}
                image={item.mainimage}
                onAddToCart={() => addToCart(item.id)}
                onToggleWishlist={() => handleRemoveFromWishlist(item.id)}
                isWishlisted={true}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      )}
    </section>
  );
};

export default Wishlist;
