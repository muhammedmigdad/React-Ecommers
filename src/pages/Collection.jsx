// src/components/Collection.js
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../compontents/Title.jsx";
import ProductItem from "../compontents/ProductItem.jsx";
import axios from "../compontents/services/axios.js";
import { assets } from "../assets/assets.js";
import { motion } from 'framer-motion'; // Import motion

const colors = {
  background: "#000000",
  card: "#1a1a1a",
  filterBg: "rgba(51, 51, 51, 0.1)",
  text: "#ffffff",
  accent: "#3182ce",
  hover: "#ed8936",
  metallic: "#a0aec0",
  activeFilter: "#ed8936",
};

function Collection() {
  const { search, showSearch, addToCart } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (search && showSearch) params.search = search.trim();
        if (category.length > 0) params.category = category.join(",");
        if (subcategory.length > 0) params.subcategory = subcategory.join(",");
        if (sortType && sortType !== "relevant") params.sort = sortType;

        const response = await axios.get("/product_view/", { params });
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format: Expected an array");
        }
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error.response) {
          setError(`Server error: ${error.response.status} - ${error.response.data.error || "Bad Request"}`);
        } else if (error.request) {
          setError("Network error: Could not reach the server.");
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory, search, showSearch, sortType]);

  const handleAddToCart = (productId, size = "M") => {
    addToCart(productId, size);
    alert("Added to cart!");
  };

  const handleToggleWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(`/toggle_wishlist/${productId}/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      alert("Failed to toggle wishlist. Please log in or try again.");
    }
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
    <div
      className="min-h-screen px-6 pt-4 md:pt-6 flex flex-col md:flex-row relative"
      style={{ background: colors.background }}
    >
      {/* Filter Section */}
      <div
        className={`md:w-1/4 p-3 md:p-4 mx-2 md:mx-4 rounded-lg sticky top-0 h-fit transition-all duration-300 ${
          isFilterVisible ? "block" : "hidden md:block"
        }`}
        style={{
          background: colors.filterBg,
          border: `1px solid ${colors.metallic}20`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex flex-col gap-6">
          <div>
            <label className="text-sm font-medium" style={{ color: colors.text }}>
              Sort By
            </label>
            <select
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
              className="w-full p-2 mt-1 border rounded-md text-sm focus:outline-none"
              style={{
                background: "rgba(51, 51, 51, 0.2)",
                color: colors.text,
                borderColor: colors.metallic,
              }}
            >
              <option className="bg-black text-white" value="relevant">Relevant</option>
              <option className="bg-black text-white" value="low-high">Price: Low to High</option>
              <option className="bg-black text-white" value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: colors.text }}>
              Category
            </label>
            <div className="mt-2 flex flex-col gap-2">
              {["Men", "Women", "Kids"].map((cat) => (
                <div key={cat} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={category.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="mr-2 h-4 w-4 border border-gray-400 rounded"
                    style={{ accentColor: colors.accent }}
                  />
                  <label className="text-sm cursor-pointer hover:text-gray-400 transition duration-200" style={{ color: colors.text }}>{cat}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium" style={{ color: colors.text }}>
              Type
            </label>
            <div className="mt-2 flex flex-col gap-2">
              {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                <div key={sub} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={subcategory.includes(sub)}
                    onChange={() => toggleSubCategory(sub)}
                    className="mr-2 h-4 w-4 border border-gray-400 rounded"
                    style={{ accentColor: colors.accent }}
                  />
                  <label className="text-sm cursor-pointer hover:text-gray-400 transition duration-200" style={{ color: colors.text }}>{sub}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="md:w-3/4 p-3 md:p-6">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <Title
            text1="OUR"
            text2="COLLECTIONS"
            className="text-center text-2xl md:text-3xl"
            style={{
              color: colors.text,
            }}
          />
          <button
            onClick={toggleFilterVisibility}
            className="md:hidden text-gray-300 hover:text-gray-500 focus:outline-none"
          >
            {isFilterVisible ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.293 6.293a1 1 0 000 1.414l6.293 6.293A1 1 0 0121 20v-2.586a1 1 0 01-.293-.707l-6.293-6.293a1 1 0 000-1.414l6.293-6.293A1 1 0 0121 4H4a1 1 0 01-1-1z" />
              </svg>
            )}
          </button>
        </div>
        {loading ? (
          <p
            className="text-center py-10 text-lg md:text-xl rounded-lg"
            style={{ color: colors.accent }}
          >
            Loading products...
          </p>
        ) : error ? (
          <p
            className="text-center py-10 text-sm md:text-base rounded-lg"
            style={{ color: "#e53e3e" }}
          >
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {products.length > 0 ? (
              products.map((item) => (
                <motion.div
                  key={item.id}
                  className="rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                  style={{
                    background: colors.card,
                    border: `1px solid ${colors.accent}20`,
                  }}
                >
                  <ProductItem
                    name={item.name}
                    id={item.id}
                    price={item.sale_price || item.regular_price}
                    originalPrice={item.regular_price}
                    image={item.mainimage}
                    onAddToCart={() => handleAddToCart(item.id)}
                    onToggleWishlist={() => handleToggleWishlist(item.id)}
                  />
                </motion.div>
              ))
            ) : (
              <p
                className="col-span-full text-center py-10 text-sm md:text-base rounded-lg"
                style={{ color: colors.text }}
              >
                No products match your selection.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Collection;