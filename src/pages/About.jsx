import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

function About() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="bg-black text-white py-20 px-6 md:px-16 lg:px-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <h1 className="text-5xl font-bold mb-4 text-indigo-500">About Our Fashion Hub</h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Dive into the world of style. Discover curated collections for Men, Women, and Kids.
        </p>
      </motion.div>

      {/* About Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-20">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-2/3"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-semibold mb-4">Our Journey</h2>
            <p className="text-gray-300 leading-relaxed">
              Born from a passion for timeless style, we blend quality with trendsetting looks. Our collections speak individuality and confidence.
            </p>
            <p className="text-gray-300 mt-4 leading-relaxed">
              With premium materials and designer collaborations, our mission is to provide a space where fashion meets self-expression.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-semibold text-green-400 mb-4">Our Promise</h2>
            <p className="text-gray-300">
              Quality. Affordability. Style. We’re here to elevate your wardrobe without compromise.
            </p>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/3"
        >
          <img
            src={assets.about_img}
            alt="Fashion"
            className="rounded-xl shadow-xl object-cover max-h-96 w-full"
          />
        </motion.div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {["Men", "Women", "Kids"].map((category) => {
          const isSelected = selectedCategory === category;
          const bgColor =
            category === "Men"
              ? "bg-indigo-600"
              : category === "Women"
              ? "bg-pink-600"
              : "bg-green-600";

          return (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer p-6 rounded-xl transition-all duration-300 shadow-lg ${
                isSelected ? `${bgColor} text-white` : "bg-gray-800 text-gray-300"
              }`}
            >
              <h3 className="text-2xl font-semibold mb-2">{category}'s Collection</h3>
              <p>
                {category === "Men" &&
                  "Timeless menswear for bold individuals."}
                {category === "Women" &&
                  "Empowering fashion for every woman."}
                {category === "Kids" &&
                  "Playful, durable, and adorable pieces."}
              </p>
              {isSelected && (
                <span className="block mt-3 italic text-sm text-gray-100">
                  Viewing {category}'s collection
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center border-t border-gray-700 pt-10"
      >
        <h2 className="text-3xl font-bold mb-3">Ready to Explore?</h2>
        <p className="text-gray-400 mb-6">Browse the latest styles and find your vibe.</p>
        <a
          href="/shop"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-full transition-all"
        >
          Shop Now
        </a>
      </motion.div>
    </section>
  );
}

export default About;
