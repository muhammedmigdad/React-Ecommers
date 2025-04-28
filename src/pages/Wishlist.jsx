import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axiosInstance from "../compontents/services/axios";
import ProductItem from "../compontents/ProductItem";
import { motion } from "framer-motion";

function Wishlist() {
  const { addToCart } = useContext(ShopContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        if (!token || token === "undefined") {
          throw new Error("Please log in to view your wishlist.");
        }
        const response = await axiosInstance.get("/wishlist/");
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format: Expected an array");
        }
        setWishlistItems(response.data);
      } catch (err) {
        console.error("Error fetching wishlist:", {
          message: err.message,
          code: err.code,
          response: err.response?.data,
        });
        setError(err.message || "Failed to load wishlist. Please try again.");
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
        setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== productId));
        alert(response.data.message || "Item removed from wishlist.");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      alert(error.response?.data?.message || "Failed to remove item from wishlist.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 text-base sm:text-lg">
          Loading your wishlist...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-base sm:text-lg">
          {error}
        </motion.p>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Wishlist
      </motion.h2>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductItem
                name={item.name}
                id={item.id}
                price={item.sale_price || item.regular_price}
                originalPrice={item.regular_price}
                image={item.mainimage}
                onAddToCart={() => addToCart(item.id)}
                onToggleWishlist={() => handleRemoveFromWishlist(item.id)}
                isWishlisted={true}
                className="w-full h-48 sm:h-56 md:h-64 object-cover"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p
          className="text-center text-gray-600 text-base sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your wishlist is empty.
        </motion.p>
      )}
    </section>
  );
}

export default Wishlist;