import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import axiosInstance from "../compontents/services/axios.js"; // Corrected import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function LatestCollection() {
  const { setProducts, cart, setCart, wishlist, setWishlist } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchLatestProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("products/");
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format: Expected an array");
        }
        setLatestProducts(response.data);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", {
          message: err.message,
          code: err.code,
          response: err.response?.data,
        });
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch latest products."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProducts();
  }, [setProducts]);

  // Add to cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await axiosInstance.post("/cart/add/", {
        product_id: productId,
        quantity: 1,
      });
      if (response.data.success) {
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.id === productId);
          if (existingItem) {
            return prevCart.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [
            ...prevCart,
            { id: productId, quantity: 1, ...latestProducts.find((p) => p.id === productId) },
          ];
        });
        alert(response.data.message || "Added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      alert(
        error.response?.data?.message || "Failed to add to cart. Please try again."
      );
    }
  };

  // Toggle wishlist
  const handleToggleWishlist = async (productId) => {
    try {
      const response = await axiosInstance.post(`/toggle_wishlist/${productId}/`);
      if (response.data.in_wishlist) {
        setWishlist((prevWishlist) => [
          ...prevWishlist,
          latestProducts.find((p) => p.id === productId),
        ]);
        alert(response.data.message || "Added to wishlist!");
      } else {
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
        alert(response.data.message || "Removed from wishlist!");
      }
    } catch (error) {
      console.error("Error toggling wishlist:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
      });
      alert(
        error.response?.data?.message ||
          "Failed to update wishlist. Please try again."
      );
    }
  };

  return (
    <section className="my-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="text-center mb-8">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-2 max-w-2xl mx-auto">
          Discover our latest hand-picked collections with the best quality and design.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-base sm:text-lg">
          Loading latest collections...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 text-base sm:text-lg">
          {error.includes("Network Error")
            ? "Could not connect to the server. Please check your network connection."
            : error}
        </p>
      ) : latestProducts.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween= {20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-12"
        >
          {latestProducts.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductItem
                name={item.name}
                id={item.id}
                price={item.sale_price || item.regular_price}
                originalPrice={item.regular_price}
                image={item.mainimage}
                onAddToCart={() => handleAddToCart(item.id)}
                onToggleWishlist={() => handleToggleWishlist(item.id)}
                isWishlisted={wishlist ? wishlist.some((w) => w.id === item.id) : false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500 text-base sm:text-lg">
          No latest collections available.
        </p>
      )}
    </section>
  );
}

export default LatestCollection;