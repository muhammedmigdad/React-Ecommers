import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const models = [
  { name: "Ethereal Flow", image: assets.p_img19 },
  { name: "Structured Form", image: assets.men1 },
  { name: "Textured Layers", image: assets.p_img37 },
  { name: "Dynamic Drape", image: assets.p_img44 },
  { name: "Sculpted Silhouette", image: assets.contact_img },
  { name: "Urban Geometry", image: assets.about_img },
];

function ModelShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % models.length);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex]);

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + models.length) % models.length);
    clearTimeout(timeoutRef.current);
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % models.length);
    clearTimeout(timeoutRef.current);
  };

  return (
    <section className="bg-black text-white py-12 px-4 sm:px-8 md:px-16">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
          Explore New Arrivals ✨
        </h2>
        <p className="text-gray-400 text-base max-w-2xl mx-auto">
          Fresh styles every season, explore fashion reimagined.
        </p>
      </motion.div>

      <div className="relative flex items-center justify-center max-w-7xl mx-auto">
        {/* Prev Button */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full z-40"
        >
          <FaChevronLeft className="text-white text-xl" />
        </button>

        {/* Carousel */}
        <div className="flex gap-4 justify-center items-center overflow-hidden w-full px-4 sm:px-10">
          {models.map((model, index) => {
            const isActive = index === activeIndex;
            const isAdjacent =
              index === (activeIndex - 1 + models.length) % models.length ||
              index === (activeIndex + 1) % models.length;

            return (
              <motion.div
                key={model.name}
                onClick={() => setActiveIndex(index)}
                className={`relative rounded-xl overflow-hidden transition-all duration-500 shadow-xl cursor-pointer transform ${
                  isActive
                    ? "scale-100 opacity-100 z-30"
                    : isAdjacent
                    ? "scale-90 opacity-70 z-20"
                    : "scale-75 opacity-40 z-10 hidden sm:block"
                } ${
                  isActive
                    ? "w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-64 sm:h-72 md:h-80 lg:h-96"
                    : "w-24 sm:w-32 md:w-40 lg:w-48 h-32 sm:h-40 md:h-48 lg:h-60"
                }`}
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 w-full bg-black/60 text-center py-2 text-sm sm:text-base font-semibold">
                  {model.name}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full z-40"
        >
          <FaChevronRight className="text-white text-xl" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 gap-2">
        {models.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default ModelShowcase;
