import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";

const colors = {
  background: ["rgba(15, 23, 42, 0.7)", "rgba(30, 41, 59, 0.7)", "rgba(39, 55, 77, 0.7)", "rgba(56, 74, 97, 0.7)"], // Array of semi-transparent background colors
  primary: "#6366f1",
  secondary: "#10b981",
  textPrimary: "#f8fafc",
  textSecondary: "#94a3b8",
  accent: "#f59e0b",
  hover: "#ec4899",
};

function Hero() {
  const containerRef = useRef(null);
  const [currentBgColorIndex, setCurrentBgColorIndex] = useState(0);
  const [currentFgImage, setCurrentFgImage] = useState(0);
  const controls = useAnimation();
  const isAnimating = useRef(false);

  // Sample foreground images array
  const fgImages = [
    assets.p_img19,
    assets.p_img37,
    assets.men1,
    assets.p_img44,
  ];

  // Enhanced image navigation with animation control for foreground
  const nextFgImage = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    await controls.start({
      opacity: 0,
      x: -50,
      transition: { duration: 0.5 },
    });

    setCurrentFgImage((prev) => (prev === fgImages.length - 1 ? 0 : prev + 1));

    await controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    });

    isAnimating.current = false;
  };

  const prevFgImage = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    await controls.start({
      opacity: 0,
      x: 50,
      transition: { duration: 0.5 },
    });

    setCurrentFgImage((prev) => (prev === 0 ? fgImages.length - 1 : prev - 1));

    await controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    });

    isAnimating.current = false;
  };

  // Auto-rotate background colors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgColorIndex((prev) => (prev === colors.background.length - 1 ? 0 : prev + 1));
    }, 5000); // Changed interval for background color

    return () => clearInterval(interval);
  }, [colors.background.length]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden min-h-screen bg-${
        colors.background[currentBgColorIndex].split('(')[1].split(',')[0] // Extract base color for Tailwind class
      } transition-colors duration-1000`}
      style={{
        backgroundColor: colors.background[currentBgColorIndex], // Apply full rgba color for transparency
        backdropFilter: 'blur(10px)', // Add blur for glass effect (may need vendor prefixes)
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen items-center justify-center p-6 md:p-10 lg:p-12">
        {/* Left side - Text content */}
        <motion.div
          className="hero-text text-center lg:text-left mb-8 lg:mb-0 lg:mr-12 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            className="flex items-center gap-4 justify-center lg:justify-start mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="w-12 h-1 bg-gradient-to-r from-transparent to-indigo-400" />
            <motion.p
              className="font-medium text-lg tracking-widest text-indigo-300 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Glass Effect
            </motion.p>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            See Through the Style
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Experience a modern "glass" effect background with dynamically changing subtle colors.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <button className="relative overflow-hidden px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all duration-300 group">
              <span className="relative z-10">Explore</span>
              <span className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </button>
            <button className="ml-4 px-6 py-2 rounded-full border border-slate-400 text-slate-300 font-semibold hover:bg-slate-800 transition-all duration-300">
              Details
            </button>
          </motion.div>
        </motion.div>

        {/* Right side - Image Controls */}
        <div className="relative w-full max-w-md mt-8 lg:mt-0">
          <div className="relative rounded-lg shadow-xl overflow-hidden border border-slate-800">
            <AnimatePresence mode="wait">
              <motion.img
                key={`foreground-${currentFgImage}`}
                src={fgImages[currentFgImage]}
                alt={`Hero Item ${currentFgImage + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <motion.button
                onClick={prevFgImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg"
              >
                &#10094;
              </motion.button>
              <motion.button
                onClick={nextFgImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg"
              >
                &#10095;
              </motion.button>
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {fgImages.map((_, index) => (
                <motion.button
                  key={`dot-${index}`}
                  onClick={() => setCurrentFgImage(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentFgImage === index ? "bg-indigo-500" : "bg-slate-400 hover:bg-slate-300"
                  }`}
                  animate={{ scale: currentFgImage === index ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;