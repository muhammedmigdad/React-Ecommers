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
      className="container mx-auto px-4 py-8"
    >
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have questions about our products? Get in touch with us!
        </p>
      </header>

      {/* Contact Information Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gray-50 p-8 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Reach Out To Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Store Location */}
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">📍 Store Location</h3>
            <p className="text-gray-700">
              123 Fashion Street<br />
              New York, NY 10001<br />
              United States
            </p>
          </div>

          {/* Opening Hours */}
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">⏰ Opening Hours</h3>
            <p className="text-gray-700">
              Mon - Fri: 9 AM - 8 PM<br />
              Sat: 10 AM - 6 PM<br />
              Sun: 12 PM - 5 PM
            </p>
          </div>

          {/* Contact Details */}
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">📞 Contact Info</h3>
            <p className="text-gray-700">
              Phone: (555) 123-4567<br />
              Email: support@fashionstore.com
            </p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="text-center mt-6">
          <h3 className="text-lg font-medium mb-3">Follow Us</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook} alt="Facebook" className="w-10 h-10 transition-transform duration-200 hover:scale-110" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.instagram} alt="Instagram" className="w-10 h-10 transition-transform duration-200 hover:scale-110" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.x} alt="x" className="w-10 h-10 transition-transform duration-200 hover:scale-110" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={assets.linkedin} alt="LinkedIn" className="w-10 h-10 transition-transform duration-200 hover:scale-110" />
            </a>
          </div>
        </div>


      </motion.div>

      {/* Google Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-gray-100 p-4 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Find Us</h2>
        <div className="w-full h-96 rounded-lg overflow-hidden">
          <iframe
            title="Google Map"
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
