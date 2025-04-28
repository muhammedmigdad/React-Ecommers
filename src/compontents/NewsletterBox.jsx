// src/components/Add.js
import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

function Add() {
  return (
    <section className="bg-black text-white py-24 px-4 sm:px-10 md:px-20">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        {/* Left Content */}
        <motion.div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left" variants={fadeIn}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Fashion Meets <span className="text-pink-400">Confidence</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
            Upgrade your style with our premium collection—designed for bold, modern individuals who stand out from the crowd.
          </p>
          <div>
            <a
              href="/Collection"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full transition duration-300 shadow-md hover:shadow-lg"
            >
              Explore Collection
            </a>
          </div>
        </motion.div>

        {/* Right Image with Black Shadow Overlay */}
        <motion.div className="w-full lg:w-1/2" variants={fadeIn}>
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[550px] overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={assets.men1}
              alt="Fashion Ad"
              className="w-full h-full object-cover object-center"
            />
            {/* Black Shadow Overlay on Right Half */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Add;