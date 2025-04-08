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
      className="container px-8 md:px-10 lg:px-16 xl:px-20 2xl:px-24 mx-auto py-12 bg-gradient-to-br from-gray-900 to-black  shadow-xl"
    >
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl text-indigo-400 font-bold mb-6">About Our Fashion Hub</h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Delve into a world of style and discover curated collections for Men, Women, and Kids.
        </p>
      </motion.header>

      {/* Main content with image on right */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Left side content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-2/3"
        >
          {/* Our Story Section */}
          <div className="mb-10">
            <h2 className="text-3xl text-white font-semibold mb-6">Our Journey</h2>
            <p className="text-gray-300 leading-relaxed">
              From a shared passion for exceptional style, our fashion store was born. We envisioned a space where quality meets the latest trends, offering a diverse range for every age and taste. Our journey has been fueled by a commitment to sourcing premium materials and collaborating with talented designers to bring you collections that inspire confidence and individuality. We believe that fashion is more than just clothing; it's a form of self-expression.
            </p>
            <p className="text-gray-300 mt-4 leading-relaxed">
              Our dedication extends beyond the garments themselves. We are committed to providing an exceptional shopping experience, from our user-friendly online platform to our attentive customer service. We strive to build a community where fashion enthusiasts can connect and discover their unique style.
            </p>
          </div>

          {/* Commitment Section */}
          <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl text-green-400 font-semibold mb-6">Our Promise</h2>
            <p className="text-gray-300 leading-relaxed">
              At the heart of our brand is a promise of quality, affordability, and unparalleled customer satisfaction. We meticulously select each item in our collections, ensuring they meet our high standards of craftsmanship and style. We believe that everyone deserves to feel good in what they wear, without breaking the bank. Our team is always here to assist you, ensuring a seamless and enjoyable shopping experience.
            </p>
          </div>
        </motion.div>

        {/* Right side image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:w-1/3 flex items-center justify-center"
        >
          <img
            src={assets.about_img}
            alt="Fashion Showcase"
            className="rounded-lg shadow-lg w-full object-cover h-auto max-h-96"
          />
        </motion.div>
      </div>

      {/* Fashion Categories */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* Men Section */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`p-8 rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
              selectedCategory === "Men" ? "bg-indigo-500 text-white" : "bg-gray-800 bg-opacity-80 text-gray-300"
            }`}
            onClick={() => setSelectedCategory("Men")}
          >
            <h3 className="text-2xl font-semibold mb-4">Men's Collection</h3>
            <p className={selectedCategory === "Men" ? "text-white" : "text-gray-400"}>
              Discover our curated selection of men's apparel, featuring everything from timeless classics to the latest trends.
            </p>
            {selectedCategory === "Men" && (
              <motion.span className="inline-block mt-4 text-indigo-200 italic">Currently viewing Men's collection</motion.span>
            )}
          </motion.div>

          {/* Women Section */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`p-8 rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
              selectedCategory === "Women" ? "bg-pink-500 text-white" : "bg-gray-800 bg-opacity-80 text-gray-300"
            }`}
            onClick={() => setSelectedCategory("Women")}
          >
            <h3 className="text-2xl font-semibold mb-4">Women's Collection</h3>
            <p className={selectedCategory === "Women" ? "text-white" : "text-gray-400"}>
              Explore our exquisite range of women's fashion, designed to empower and inspire with every style.
            </p>
            {selectedCategory === "Women" && (
              <motion.span className="inline-block mt-4 text-pink-200 italic">Currently viewing Women's collection</motion.span>
            )}
          </motion.div>

          {/* Kids Section */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`p-8 rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
              selectedCategory === "Kids" ? "bg-green-500 text-white" : "bg-gray-800 bg-opacity-80 text-gray-300"
            }`}
            onClick={() => setSelectedCategory("Kids")}
          >
            <h3 className="text-2xl font-semibold mb-4">Kids' Collection</h3>
            <p className={selectedCategory === "Kids" ? "text-white" : "text-gray-400"}>
              Discover adorable and durable fashion for your little ones, blending comfort and playful designs.
            </p>
            {selectedCategory === "Kids" && (
              <motion.span className="inline-block mt-4 text-green-200 italic">Currently viewing Kids' collection</motion.span>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center py-10 border-t border-gray-700"
      >
        <h2 className="text-3xl text-white font-semibold mb-4">Ready to Explore?</h2>
        <p className="text-lg text-gray-400 mb-6">
          Browse our latest arrivals and find your next favorite outfit.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-300"
        >
          Shop Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default About;