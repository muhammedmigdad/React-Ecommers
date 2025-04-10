import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../compontents/data/index.js";

function BestSeller() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(5);
    const sliderRef = useRef(null);
    const autoSlideInterval = useRef(null);

    // Determine items per view based on screen size
    useEffect(() => {
        const updateItemsPerView = () => {
            const width = window.innerWidth;
            if (width < 640) setItemsPerView(1);
            else if (width < 768) setItemsPerView(2);
            else if (width < 1024) setItemsPerView(3);
            else setItemsPerView(5);
        };

        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    // Fetch products
    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    // Auto-slide functionality
    useEffect(() => {
        if (products.length > itemsPerView) {
            autoSlideInterval.current = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % (products.length - itemsPerView + 1));
            }, 5000);
        }
        return () => clearInterval(autoSlideInterval.current);
    }, [products.length, itemsPerView]);

    const nextSlide = () => {
        setCurrentSlide(prev => Math.min(prev + 1, products.length - itemsPerView));
        resetAutoSlide();
    };

    const prevSlide = () => {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
        resetAutoSlide();
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        resetAutoSlide();
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval.current);
        autoSlideInterval.current = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % (products.length - itemsPerView + 1));
        }, 5000);
    };

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 50) {
            prevSlide();
        } else if (info.offset.x < -50) {
            nextSlide();
        }
    };

    if (loading) {
        return (
            <div className="my-16 text-center">
                <Title text1="BEST" text2="SELLERS" />
                <p className="mt-4 text-sm">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-16 text-center">
                <Title text1="BEST" text2="SELLERS" />
                <p className="mt-4 text-sm text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <section className="my-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Title text1="BEST" text2="SELLERS" />
                <p className="mt-2 max-w-xl mx-auto text-gray-500 text-sm sm:text-base">
                    Discover our top-selling products loved by customers.
                </p>
            </motion.div>

            <div className="relative overflow-hidden">
                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    disabled={currentSlide >= products.length - itemsPerView}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>

                {/* Slider */}
                <motion.div
                    ref={sliderRef}
                    className="w-full"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                >
                    <motion.div
                        className="flex"
                        animate={{
                            x: `-${currentSlide * (100 / itemsPerView)}%`,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                    >
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id || index}
                                className={`flex-shrink-0 w-full ${
                                    itemsPerView === 1 ? 'w-full' :
                                    itemsPerView === 2 ? 'w-1/2' :
                                    itemsPerView === 3 ? 'w-1/3' :
                                    'w-1/5'
                                } px-2`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <ProductItem
                                    id={product.id}
                                    name={product.name}
                                    image={product.mainimage}
                                    price={product.sale_price || product.regular_price}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Pagination */}
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: Math.ceil(products.length / itemsPerView) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index * itemsPerView)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                currentSlide >= index * itemsPerView && 
                                currentSlide < (index + 1) * itemsPerView
                                    ? "bg-black w-6"
                                    : "bg-gray-300"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BestSeller;