import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../compontents/data/index.js";  // Corrected import path

function BestSeller() {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBestSellers = async () => {
            try {
                setLoading(true);
                const products = await fetchProducts();
                setBestSellers(products);
            } catch (err) {
                setError("Failed to load best sellers. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        getBestSellers();
    }, []);

    if (loading) return <div className="my-10 text-center"><Title text1="BEST" text2="SELLERS" /><p>Loading...</p></div>;
    if (error) return <div className="my-10 text-center"><Title text1="BEST" text2="SELLERS" /><p className="text-red-500">{error}</p></div>;

    return (
        <div className="my-10 px-10">
            <motion.div className="text-center text-3xl py-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Title text1="BEST" text2="SELLERS" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Discover our top-selling products loved by customers
                </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {bestSellers.map((item, index) => (
                    <motion.div key={item.id || index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <ProductItem 
                            id={item.id} 
                            name={item.name} 
                            image={item.mainimage} 
                            price={item.sale_price || item.regular_price} 
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default BestSeller;
