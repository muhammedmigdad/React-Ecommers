import React from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="flex flex-col sm:flex-row border border-gray-400"
    >
      {/* Hero Left Side */}
      <motion.div
        initial={{ x: -50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0"
      >
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </motion.div>

      {/* Hero Right Side */}
      <motion.img
        src={assets.hero_img}
        alt="Hero"
        initial={{ x: 50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full sm:w-1/2"
      />
    </motion.div>
  );
}

export default Hero;

