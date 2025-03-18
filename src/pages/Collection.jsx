import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../compontents/Title.jsx";
import ProductItem from "../compontents/ProductItem.jsx";
import axios from "../compontents/services/axios.js";

function Collection() {
  const { search, showSearch } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

        console.log("Fetching products with params:", params); // Debugging
        const response = await axios.get("/product_view/", { params });
        console.log("API response:", response.data); // Debugging

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
    <div className="min-h-screen pt-4 md:pt-6 bg-gray-100">
      <div className="bg-white shadow-md p-3 md:p-4 mx-2 md:mx-4 rounded-lg sticky top-0 z-10">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <div className="w-full md:w-48">
            <select
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:gap-6 w-full md:w-auto">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Category:</span>
              <div className="flex flex-wrap gap-2">
                {["Men", "Women", "Kids"].map((cat) => (
                  <label key={cat} className="flex items-center gap-1 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={category.includes(cat)}
                      onChange={toggleCategory}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Type:</span>
              <div className="flex flex-wrap gap-2">
                {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                  <label key={sub} className="flex items-center gap-1 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      value={sub}
                      checked={subcategory.includes(sub)}
                      onChange={toggleSubCategory}
                      className="w-4 h-4 accent-blue-600 rounded"
                    />
                    <span>{sub}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 md:p-6">
        <Title text1="OUR" text2="COLLECTIONS" className="text-center mb-4 md:mb-6" />
        {loading ? (
          <p className="text-center text-gray-600 py-10 text-sm md:text-base">Loading products...</p>
        ) : error ? (
          <p className="text-center text-red-600 py-10 text-sm md:text-base">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.length > 0 ? (
              products.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <ProductItem
                    name={item.name}
                    id={item.id}
                    price={item.sale_price || item.regular_price}
                    image={item.mainimage}
                    className="w-full"
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 py-10 text-sm md:text-base">
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