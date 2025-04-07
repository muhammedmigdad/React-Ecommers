import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setIsVisible(true); // Trigger fade-in animation
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container px-10 bg-black  mx-auto  py-8"
    >
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl text-white font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          Discover the latest trends in Men, Women, and Kids' fashion.
        </p>
      </motion.header>

      {/* Main content with image on right */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Left side content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-2/3"
        >
          {/* Our Story Section */}
          <div className="mb-8">
            <h2 className="text-3xl text-white font-semibold mb-4">Our Story</h2>
            <p className="text-gray-700">
              Welcome to our fashion store! We specialize in high-quality clothing
              for Men, Women, and Kids. Our goal is to bring the latest styles to
              you at the best prices while ensuring comfort and elegance.
              fashion store! We specialize in high-quality clothing
              for Men, Women, and Kids. Our goal is to bring the latest styles to
              you at the best prices while ensuring comfort and elegance.
              high-quality clothing
              for Men, Women, and Kids. Our goal is to bring the latest styles to
              you at the best prices while ensuring comfort and elegance.
              offer the best quality, unbeatable prices, and
              outstanding customer service. Join us in redefining fashion!
            </p>
          </div>
          
          {/* Commitment Section */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">Our Commitment</h2>
            <p className="text-gray-700">
              We strive to offer the best quality, unbeatable prices, and
              outstanding customer service. Join us in redefining fashion!
            </p>
          </div>
        </motion.div>
        
        {/* Right side image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="md:w-1/3 flex items-center justify-center"
        >
          <img 
            src={assets.about_img} 
            alt="Fashion Banner" 
            className="rounded-lg shadow-lg w-full" 
          />
        </motion.div>
      </div>

      {/* Fashion Categories */}
      <section className="mb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Men Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-lg shadow-sm cursor-pointer transition-shadow duration-300 ${
              selectedCategory === "Men" ? "bg-blue-500 text-white" : "bg-gray-50"
            }`}
            onClick={() => setSelectedCategory("Men")}
          >
            <h3 className="text-2xl font-semibold mb-3">Men's Fashion</h3>
            <p className={selectedCategory === "Men" ? "text-white" : "text-gray-700"}>
              Explore our premium collection of stylish men's wear, from casual
              outfits to formal attire.
            </p>
          </motion.div>

          {/* Women Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-lg shadow-sm cursor-pointer transition-shadow duration-300 ${
              selectedCategory === "Women" ? "bg-pink-500 text-white" : "bg-gray-50"
            }`}
            onClick={() => setSelectedCategory("Women")}
          >
            <h3 className="text-2xl font-semibold mb-3">Women's Fashion</h3>
            <p className={selectedCategory === "Women" ? "text-white" : "text-gray-700"}>
              Discover trendy and elegant outfits, designed to make every woman
              feel confident and beautiful.
            </p>
          </motion.div>

          {/* Kids Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-lg shadow-sm cursor-pointer transition-shadow duration-300 ${
              selectedCategory === "Kids" ? "bg-green-500 text-white" : "bg-gray-50"
            }`}
            onClick={() => setSelectedCategory("Kids")}
          >
            <h3 className="text-2xl font-semibold mb-3">Kids' Fashion</h3>
            <p className={selectedCategory === "Kids" ? "text-white" : "text-gray-700"}>
              Cute and comfortable fashion for the little ones, blending fun with
              style.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}

export default About;

