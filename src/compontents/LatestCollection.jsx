import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import api from "../compontents/services/axios"; // Import your Axios instance

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
        scale: 1.08,
        rotate: 3,
        transition: { duration: 0.3, ease: "easeInOut" }
    }
};

function LatestCollection() {
    const { setProducts } = useContext(ShopContext); // Assuming you might want to update the global products state
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get("/products/"); // Replace with your actual endpoint for latest products
                if (!Array.isArray(response.data)) {
                    throw new Error("Invalid response format: Expected an array for latest products");
                }
                setLatestProducts(response.data);
                // If you want to update the global products state with the latest ones:
                // setProducts(response.data);
            } catch (err) {
                console.error("Error fetching latest products:", err);
                setError(err.message || "Failed to fetch latest products.");
            } finally {
                setLoading(false);
            }
        };

        fetchLatestProducts();
    }, [setProducts]);

    return (
        <motion.div
            className="my-10 px-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
        >
            {/* Title Section */}
            <div className="text-center py-8 text-3xl">
                <Title text1="LATEST" text2="COLLECTIONS" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Discover our latest hand-picked collections with the best quality and design.
                </p>
            </div>

            {/* Products Grid */}
            {loading ? (
                <p className="text-center text-gray-500">Loading latest collections...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : latestProducts.length > 0 ? (
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
                    variants={containerVariants}
                >
                    {latestProducts.map((item) => (
                        <motion.div key={item.id} variants={itemVariants} whileHover="hover">
                            <ProductItem
                                name={item.name}
                                id={item.id}
                                price={item.sale_price || item.regular_price}
                                image={item.mainimage}
                                className="w-full"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <p className="text-center text-gray-500">No latest collections available.</p>
            )}
        </motion.div>
    );
}

export default LatestCollection;