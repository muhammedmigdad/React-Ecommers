import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../compontents/data/index.js"; // Corrected import path

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

    if (loading || error) {
        return (
            <div className="my-16 text-center">
                <Title text1="BEST" text2="SELLERS" />
                <p className={`mt-4 text-sm ${error ? "text-red-500" : ""}`}>
                    {error || "Loading..."}
                </p>
            </div>
        );
    }

    return (
        <section className="my-16  px-6 md:px-12 lg:px-20">
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <Title text1="BEST" text2="SELLERS" />
                <p className="mt-2 max-w-xl mx-auto text-gray-500 text-sm sm:text-base">
                    Discover our top-selling products loved by customers.
                </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
                {bestSellers.map((item, index) => (
                    <motion.div
                        key={item.id || index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
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
        </section>
    );
}

export default BestSeller;
