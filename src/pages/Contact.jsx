import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-black text-white py-20 px-6 md:px-12 lg:px-20"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-5xl font-bold text-indigo-400 mb-4">Get In Touch</h1>
        <p className="text-gray-400 text-lg">
          We're always ready to help. Reach out for inquiries, partnerships, or just to say hi.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/3 flex justify-center"
        >
          <img
            src={assets.contact_img}
            alt="Contact"
            className="rounded-2xl object-cover shadow-2xl max-h-[400px] w-full"
          />
        </motion.div>

        {/* Right - Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {[
            {
              title: "📍 Our Location",
              color: "text-indigo-300",
              content: (
                <>
                  Fashion Avenue, Suite 500<br />
                  Tech City, IN 47906<br />
                  India
                </>
              ),
            },
            {
              title: "⏰ Business Hours",
              color: "text-yellow-300",
              content: (
                <>
                  Mon - Fri: 10:00 AM – 7:00 PM<br />
                  Sat: 11:00 AM – 5:00 PM<br />
                  Sunday: Closed
                </>
              ),
            },
            {
              title: "📞 Contact Info",
              color: "text-cyan-300",
              content: (
                <>
                  Phone: +91 9876543210<br />
                  Email: info@fashionhub.in<br />
                  Support: support@fashionhub.in
                </>
              ),
            },
            {
              title: "🔗 Social Links",
              color: "text-purple-300",
              content: (
                <div className="flex flex-wrap gap-4 mt-1">
                  <a href="#" className="hover:text-blue-400">📘 Facebook</a>
                  <a href="#" className="hover:text-sky-400">🐦 Twitter</a>
                  <a href="#" className="hover:text-pink-400">📸 Instagram</a>
                </div>
              ),
            },
          ].map(({ title, color, content }, idx) => (
            <div
              key={idx}
              className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg"
            >
              <h3 className={`text-xl font-semibold mb-3 ${color}`}>{title}</h3>
              <div className="text-gray-300 text-base leading-relaxed">{content}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Google Map Embed */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="bg-gray-900/80 p-6 rounded-xl shadow-2xl"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-orange-400">Find Us Here</h2>
        <div className="w-full h-96 overflow-hidden rounded-lg">
          <iframe
            title="Google Map - Fashion Hub"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.183948826002!2d-73.98773168459413!3d40.74844447932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1629999999999!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Contact;
