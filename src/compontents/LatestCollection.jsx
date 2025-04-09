import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import api from "../compontents/services/axios";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

function LatestCollection() {
    const { setProducts } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get("/products/");
                if (!Array.isArray(response.data)) {
                    throw new Error("Invalid response format: Expected an array");
                }
                setLatestProducts(response.data);
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
        <div className="my-10 px-4 sm:px-8 md:px-12">
            <div className="text-center mb-6">
                <Title text1="LATEST" text2="COLLECTIONS" />
                <p className="text-gray-600 text-sm mt-1 max-w-xl mx-auto">
                    Discover our latest hand-picked collections with the best quality and design.
                </p>
            </div>

            {loading ? (
                <p className="text-center text-gray-500">Loading latest collections...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : latestProducts.length > 0 ? (
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                >
                    {latestProducts.map((item) => (
                        <SwiperSlide key={item.id}>
                            <ProductItem
                                name={item.name}
                                id={item.id}
                                price={item.sale_price || item.regular_price}
                                originalPrice={item.regular_price}
                                image={item.mainimage}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-center text-gray-500">No latest collections available.</p>
            )}
        </div>
    );
}

export default LatestCollection;
