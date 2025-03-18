import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useSpring, useTransform, useViewportScroll } from "framer-motion";
import { assets } from "../assets/assets";

// Define a color palette (customizable)
const colors = {
  backgroundStart: "#1a1a2e", // Dark blue-gray
  backgroundEnd: "#16213e",   // Slightly lighter blue-gray
  particle: "#e94560",       // Vibrant red-pink
  text: "#e0e0e0",           // Light gray
  accent: "#0f3460",         // Deep blue for lines
  hover: "#f08a5d",          // Warm orange for hover effects
};

// Particle component with mouse interaction
const Particle = ({ x, y, mouseX, mouseY, color }) => {
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const dx = mouseX - x;
    const dy = mouseY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      springX.set(x + dx * 0.2);
      springY.set(y + dy * 0.2);
    }
  }, [mouseX, mouseY, x, y, springX, springY]);

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{ x: springX, y: springY, backgroundColor: color }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        rotate: Math.random() * 360,
      }}
      transition={{
        duration: 2.5,
        ease: "easeOut",
        repeat: Infinity,
        delay: Math.random() * 1.5,
      }}
    />
  );
};

function Hero() {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useViewportScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, -50]);

  // Title animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, rotate: -15 },
    visible: { opacity: 1, y: 0, rotate: 0 },
    hover: {
      y: -8,
      color: colors.hover,
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 1.2, ease: "easeOut" },
    },
    hover: {
      scale: 1.1,
      boxShadow: `0px 0px 20px ${colors.hover}80`, // Use rgba with hover color
      transition: { duration: 0.4, yoyo: Infinity },
    },
    tap: { scale: 0.95 },
  };

  // Background animation with gradient
  const bgVariants = {
    animate: {
      background: [
        `radial-gradient(circle, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
        `radial-gradient(circle, ${colors.backgroundEnd}, ${colors.backgroundStart})`,
        `radial-gradient(circle, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
      ],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Mouse move handler
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Split title into letters
  const titleText = "Latest Arrivals";
  const titleLetters = titleText.split("");

  return (
    <motion.div
      ref={containerRef}
      className="relative flex flex-col sm:flex-row border border-gray-400 overflow-hidden min-h-[60vh]"
      variants={bgVariants}
      animate="animate"
      onMouseMove={handleMouseMove}
    >
      {/* Particle Background with Mouse Interaction */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Particle
          key={i}
          x={Math.random() * (window.innerWidth / 2)}
          y={Math.random() * (window.innerHeight / 2)}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          color={colors.particle}
        />
      ))}

      {/* Hero Left Side */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -70 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 1, ease: "easeOut", delay: 0.3 },
          },
        }}
        className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 relative z-10"
      >
        <div style={{ color: colors.text }}>
          {/* Bestseller Tag */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <motion.div
              className="w-8 md:w-11 h-[2px]"
              style={{ backgroundColor: colors.accent }}
              animate={{ width: [8, 25, 8], rotate: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </motion.div>

          {/* Animated Title with Parallax */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            style={{ y: parallaxY }}
            className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed"
          >
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
                whileHover="hover"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Shop Now Button */}
          <motion.div
            className="flex items-center gap-3"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.p
              className="font-semibold text-sm md:text-base cursor-pointer"
              whileHover={{ color: colors.hover }}
            >
              SHOP NOW
            </motion.p>
            <motion.div
              className="w-8 md:w-11 h-[1px]"
              style={{ backgroundColor: colors.accent }}
              animate={{ width: [8, 25, 8], rotate: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Hero Right Side with Parallax */}
      <motion.img
        src={assets.hero_img}
        alt="Hero"
        initial={{ opacity: 0, x: 70, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.05,
          rotate: 2,
          transition: { duration: 0.4 },
        }}
        style={{ y: useTransform(scrollY, [0, 300], [0, 20]) }}
        className="w-full sm:w-1/2 object-cover relative z-10"
      />

      {/* Dynamic Overlay Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, transparent, ${colors.backgroundEnd}33, transparent)`,
        }}
        animate={{
          x: [0, 50, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export default Hero;