import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FullBackgroundHero = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [assets.p_img19, assets.p_img37, assets.men1, assets.p_img44];

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background Images */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Slider Background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 z-20">
        <button
          onClick={goToPrev}
          className="bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xl md:text-2xl focus:outline-none transition"
        >
          &#10094;
        </button>
        <button
          onClick={goToNext}
          className="bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-xl md:text-2xl focus:outline-none transition"
        >
          &#10095;
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center space-x-2 md:space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition ${
              index === currentIndex ? "bg-white" : "bg-gray-500 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-end p-16 md:p-20">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-right space-y-6 max-w-md md:max-w-xl"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Summer Sale <span className="text-indigo-400">2025</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-300">
            Discover the latest trends at unbeatable prices.
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/collection")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-full text-sm md:text-base transition"
            >
              Shop Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FullBackgroundHero;
