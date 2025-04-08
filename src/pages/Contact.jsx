import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="container mx-auto px-8 md:px-10 lg:px-16 xl:px-20 2xl:px-24 py-12 bg-gradient-to-br from-gray-900 to-slate-800 shadow-xl text-white"
    >
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold text-indigo-400 mb-6">Connect With Us</h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          We're here to help! Reach out with any questions, feedback, or inquiries.
        </p>
      </motion.header>

      {/* Main content with image on left */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Left side image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/3 flex items-center justify-center rounded-lg overflow-hidden shadow-md"
        >
          <img
            src={assets.contact_img}
            alt="Contact Our Team"
            className="w-full h-auto object-cover"
            style={{ maxHeight: '400px' }}
          />
        </motion.div>

        {/* Right side content */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:w-2/3 bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center text-green-400">Get In Touch</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg">
            {/* Store Location */}
            <div className="p-6 bg-gray-700 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-indigo-300 mb-3"><span role="img" aria-label="location">📍</span> Our Location</h3>
              <address className="text-gray-300 leading-relaxed">
                Fashion Avenue, Suite 500<br />
                Tech City, IN 47906<br />
                India
              </address>
            </div>

            {/* Opening Hours */}
            <div className="p-6 bg-gray-700 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-yellow-300 mb-3"><span role="img" aria-label="clock">⏰</span> Business Hours</h3>
              <p className="text-gray-300 leading-relaxed">
                Monday - Friday: 10:00 AM - 7:00 PM<br />
                Saturday: 11:00 AM - 5:00 PM<br />
                Sunday: Closed
              </p>
            </div>

            {/* Contact Details */}
            <div className="p-6 bg-gray-700 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-cyan-300 mb-3"><span role="img" aria-label="phone">📞</span> Contact Information</h3>
              <p className="text-gray-300 leading-relaxed">
                Phone: +91 9876543210<br />
                Email: info@fashionhub.in<br />
                Support: support@fashionhub.in
              </p>
            </div>

            {/* Social Media */}
            <div className="p-6 bg-gray-700 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-purple-300 mb-3"><span role="img" aria-label="share">🔗</span> Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-blue-400 hover:text-blue-500"><span role="img" aria-label="facebook">📘</span> Facebook</a>
                <a href="#" className="text-sky-400 hover:text-sky-500"><span role="img" aria-label="twitter">🐦</span> Twitter</a>
                <a href="#" className="text-pink-400 hover:text-pink-500"><span role="img" aria-label="instagram">📸</span> Instagram</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Google Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-orange-400">Our Location on Map</h2>
        <div className="w-full h-96 rounded-lg overflow-hidden">
          {/* Replace with your actual Google Maps Embed URL */}
          <iframe
            title="Google Map - Fashion Hub India"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.183948826002!2d-73.98773168459413!3d40.74844447932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629999999999!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Contact;