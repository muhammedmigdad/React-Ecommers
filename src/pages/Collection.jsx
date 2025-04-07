import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../compontents/Title.jsx";
import ProductItem from "../compontents/ProductItem.jsx";
import axios from "../compontents/services/axios.js";
import { assets } from "../assets/assets.js";

const colors = {
  background: "#000000",
  card: "#1a1a1a",
  filterBg: "rgba(51, 51, 51, 0.1)", // Transparent glass effect
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
  const [isFilterVisible, setIsFilterVisible] = useState(true); // State to toggle filter visibility

  const toggleCategory = (value) => {
    setCategory((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
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

  const handleAddToCart = (productId) => {
    addToCart(productId);
    alert("Added to cart!");
  };

  const handleToggleWishlist = async (productId) => {
    try {
      const response = await axios.post(`/toggle_wishlist/${productId}/`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
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
      className="min-h-screen px-10 pt-4 md:pt-6 flex flex-col md:flex-row relative"
      style={{ background: colors.background }}
    >
      {/* Filter Toggle Button */}
      <button
        onClick={toggleFilterVisibility}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-full md:hidden"
      >
        {isFilterVisible ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filter Section (Left Side) */}
      <div
        className={`md:w-1/4 p-3 md:p-4 mx-2 md:mx-4 rounded-lg sticky top-0 h-fit transition-all duration-300 ${
          isFilterVisible ? "block" : "hidden md:block"
        }`}
        style={{
          background: colors.filterBg,
          border: `1px solid ${colors.metallic}20`,
          backdropFilter: "blur(10px)", // Glassmorphism effect
          WebkitBackdropFilter: "blur(10px)", // For Safari support
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <div className="flex flex-col gap-6">
          {/* Sort By Section */}
          <div>
            <label className="text-sm font-medium" style={{ color: colors.text }}>
              Sort By
            </label>
            <select
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
              className="w-full p-2 mt-1 border rounded-md text-sm focus:outline-none"
              style={{
                background: "rgba(51, 51, 51, 0.2)", // Slightly darker glass effect
                color: colors.text,
                borderColor: colors.metallic,
              }}
            >
              <option className="bg-black text-white" value="relevant">Relevant</option>
              <option className="bg-black text-white" value="low-high">Price: Low to High</option>
              <option className="bg-black text-white" value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* Category Filter Section */}
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
                  <label className="text-sm" style={{ color: colors.text }}>{cat}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Type Filter Section */}
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
                  <label className="text-sm" style={{ color: colors.text }}>{sub}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Section (Right Side) */}
      <div className="md:w-3/4 p-3 md:p-6">
        <Title
          text1="OUR"
          text2="COLLECTIONS"
          className="text-center mb-4 md:mb-6 text-3xl md:text-4xl"
          style={{
            color: colors.text,
            padding: "0.5rem 2rem",
            borderRadius: "8px",
          }}
        />
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
                <div
                  key={item.id}
                  className="rounded-lg shadow-md p-4 overflow-hidden"
                  style={{
                    background: colors.card,
                    border: `1px solid ${colors.accent}20`,
                  }}
                >
                  <ProductItem
                    name={item.name}
                    id={item.id}
                    price={item.sale_price || item.regular_price}
                    image={item.mainimage}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 gap-2">
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className="bg-blue-600 px-3 py-2 rounded-xl text-white text-sm hover:bg-blue-700 transition-colors"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => handleToggleWishlist(item.id)}
                      className=" text-white flex items-center text-sm  transition-colors"
                    >
                      <img className="w-7 rounded-full  hover:bg-red-500  h-5 mr-2" src={assets.like} alt="Like" />
                    </button>
                  </div>
                </div>
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