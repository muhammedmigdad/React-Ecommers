import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
    const resetTimeout = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % models.length);
    }, 5000);

    return () => resetTimeout();
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + models.length) % models.length);
    clearTimeout(timeoutRef.current);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % models.length);
    clearTimeout(timeoutRef.current);
  };

  const getDisplayModels = () => {
    const total = models.length;
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      indices.push((activeIndex + i + total) % total);
    }
    return indices;
  };

  const getCardStyle = (index) => {
    if (index === activeIndex) {
      return "scale-100 z-30 opacity-100";
    }
    return "scale-75 opacity-60 z-10";
  };

  return (
    <section className="bg-black text-white py-20 px-4 sm:px-8 md:px-16 overflow-hidden">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Explore New Arrivals ✨</h2>
        <p className="text-gray-400 text-base max-w-2xl mx-auto">
          Discover our latest collection showcased with a modern carousel.
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="relative flex justify-center items-center max-w-7xl mx-auto">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full z-40"
        >
          <FaChevronLeft className="text-white text-xl" />
        </button>

        {/* Cards */}
        <div className="flex gap-4 items-center justify-center w-full overflow-hidden">
          {getDisplayModels().map((modelIndex, idx) => {
            const model = models[modelIndex];
            const styleClass = getCardStyle(modelIndex);

            return (
              <motion.div
                key={model.name}
                onClick={() => setActiveIndex(modelIndex)}
                className={`w-40 md:w-52 lg:w-60 h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-xl transition-all duration-500 ease-in-out transform cursor-pointer ${styleClass}`}
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-md text-center py-2 px-2">
                  <h3 className="text-white text-xs md:text-sm font-semibold tracking-wide">
                    {model.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full z-40"
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
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default ModelShowcase;
