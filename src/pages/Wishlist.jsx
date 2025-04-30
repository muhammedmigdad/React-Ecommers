import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../compontents/ProductItem";
import Title from "../compontents/Title";
import axiosInstance from "../compontents/services/axios";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { addToCart } = useContext(ShopContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get("/wishlist/");
      setWishlistItems(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load wishlist");
      toast.error(err.response?.data?.error || "Error loading wishlist");
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const response = await axiosInstance.post(`/toggle_wishlist/${productId}/`);
      if (!response.data.in_wishlist) {
        setWishlistItems(items => items.filter(item => item.id !== productId));
        toast.success("Removed from wishlist");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update wishlist");
    }
  };

  useEffect(() => { fetchWishlist(); }, []);

  if (loading) return (
    <div className="min-h-screen py-20">
      <Title text1="YOUR" text2="WISHLIST" />
      <p className="text-center text-gray-500">Loading your wishlist...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen py-20">
      <Title text1="YOUR" text2="WISHLIST" />
      <p className="text-center text-red-500">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <Title text1="YOUR" text2="WISHLIST" />
      
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {wishlistItems.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
              isWishlisted={true}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">Your wishlist is empty</p>
      )}
    </div>
  );
};

export default Wishlist;