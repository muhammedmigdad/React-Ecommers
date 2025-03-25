import React, { useContext, useEffect, useState } from "react";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import Title from "../compontents/Title.jsx";
import ProductItem from "../compontents/ProductItem.jsx";
import axios from "../compontents/services/axios.js";

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    rotateX: 10,
    rotateY: 5,
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

// Updated color palette
const colors = {
  background: "linear-gradient(135deg, #e2e8f0, #cbd5e0)", // Gradient background
  card: "#ffffff",                                        // Solid white cards
  filterBg: "linear-gradient(45deg, #4a5568, #718096)",   // Metallic gradient for filter
  text: "#1a202c",
  accent: "#3182ce",
  hover: "#ed8936",
  metallic: "#a0aec0",                                    // Metallic accent
};

function Collection() {
  const { search, showSearch } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { scrollY } = useViewportScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, -20]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
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

  return (
    <div
      className="min-h-screen pt-4 rounded-xl md:pt-6 relative"
      style={{ background: colors.background }}
    >
      {/* Filter Header - Metallic Style */}
      <motion.div
        className="p-3 md:p-4 mx-2 md:mx-4 rounded-lg sticky top-0 z-20"
        style={{ 
          background: colors.filterBg,
          border: `1px solid ${colors.metallic}`,
          boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.1), 0 4px 15px rgba(0, 0, 0, 0.2)",
          y: parallaxY,
          transformPerspective: 1000,
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <div className="w-full md:w-48">
            <select
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              style={{ 
                background: "linear-gradient(45deg, #718096, #a0aec0)",
                color: colors.text,
                borderColor: colors.metallic,
              }}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-6 w-full md:w-auto">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium" style={{ color: colors.text }}>
                Category:
              </span>
              <div className="flex flex-wrap gap-2">
                {["Men", "Women", "Kids"].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-1 text-sm cursor-pointer group"
                  >
                    <motion.input
                      type="checkbox"
                      value={cat}
                      checked={category.includes(cat)}
                      onChange={toggleCategory}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: colors.accent }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span
                      className="group-hover:text-orange-500 transition-colors duration-200"
                      style={{ color: colors.text }}
                    >
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium" style={{ color: colors.text }}>
                Type:
              </span>
              <div className="flex flex-wrap gap-2">
                {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                  <label
                    key={sub}
                    className="flex items-center gap-1 text-sm cursor-pointer group"
                  >
                    <motion.input
                      type="checkbox"
                      value={sub}
                      checked={subcategory.includes(sub)}
                      onChange={toggleSubCategory}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: colors.accent }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span
                      className="group-hover:text-orange-500 transition-colors duration-200"
                      style={{ color: colors.text }}
                    >
                      {sub}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Gradient Style */}
      <div className="p-3 md:p-6 relative z-10">
        <Title
          text1="OUR"
          text2="COLLECTIONS"
          className="text-center mb-4 md:mb-6 text-3xl md:text-4xl"
          style={{ 
            color: colors.text,
            background: "linear-gradient(90deg, #edf2f7, #e2e8f0)",
            padding: "0.5rem 2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        {loading ? (
          <motion.p
            className="text-center py-10 text-lg md:text-xl rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
              color: colors.accent,
              background: "linear-gradient(90deg, #edf2f7, #e2e8f0)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            Loading products...
          </motion.p>
        ) : error ? (
          <motion.p
            className="text-center py-10 text-sm md:text-base rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
              color: "#e53e3e",
              background: "linear-gradient(90deg, #edf2f7, #e2e8f0)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {error}
          </motion.p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {products.length > 0 ? (
              products.map((item) => (
                <motion.div
                  key={item.id}
                  className="rounded-lg shadow-md p-4 overflow-hidden"
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{
                    transformPerspective: 1000,
                    background: colors.card,
                    border: `1px solid ${colors.accent}20`,
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <ProductItem
                    name={item.name}
                    id={item.id}
                    price={item.sale_price || item.regular_price}
                    image={item.mainimage}
                    className="w-full"
                  />
                </motion.div>
              ))
            ) : (
              <motion.p
                className="col-span-full text-center py-10 text-sm md:text-base rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  color: colors.text,
                  background: "linear-gradient(90deg, #edf2f7, #e2e8f0)",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                No products match your selection.
              </motion.p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Collection;