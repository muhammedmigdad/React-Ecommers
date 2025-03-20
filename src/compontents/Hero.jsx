import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useSpring, useTransform, useViewportScroll } from "framer-motion";
import { assets } from "../assets/assets";

// Color palette with richer tones
const colors = {
  backgroundStart: "#0d0d21", // Deep midnight blue
  backgroundEnd: "#1e2a44",   // Soft twilight blue
  particle: "#ff577f",       // Vibrant coral
  text: "#f5f5f5",           // Crisp white
  accent: "#00d4ff",         // Electric cyan
  hover: "#ffaa4c",          // Warm amber
  glow: "#ff577f80",         // Coral glow with transparency
};

// Advanced Particle component with 3D-like behavior
const Particle = ({ x, y, mouseX, mouseY, color, index }) => {
  const springX = useSpring(x, { stiffness: 150, damping: 25 });
  const springY = useSpring(y, { stiffness: 150, damping: 25 });
  const springZ = useSpring(0, { stiffness: 100, damping: 20 }); // Z-axis for 3D effect
  const rotateX = useTransform(springY, [0, 600], [-10, 10]);
  const rotateY = useTransform(springX, [0, 1200], [-10, 10]);

  useEffect(() => {
    const dx = mouseX - x;
    const dy = mouseY - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 150) {
      const repelFactor = Math.min(0.3, 150 / (distance + 1));
      springX.set(x - dx * repelFactor);
      springY.set(y - dy * repelFactor);
      springZ.set(Math.random() * 20 - 10); // Random Z-depth on interaction
    } else {
      springX.set(x);
      springY.set(y);
      springZ.set(0);
    }
  }, [mouseX, mouseY, x, y, springX, springY, springZ]);

  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full pointer-events-none"
      style={{
        x: springX,
        y: springY,
        z: springZ,
        backgroundColor: color,
        rotateX,
        rotateY,
        transformPerspective: 1000, // Adds 3D depth
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.8, 0],
        rotate: Math.random() * 360,
        boxShadow: `0 0 15px ${colors.glow}`,
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        delay: index * 0.1, // Staggered entry
      }}
    />
  );
};

function Hero() {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useViewportScroll();
  const parallaxYText = useTransform(scrollY, [0, 300], [0, -30]);
  const parallaxYImage = useTransform(scrollY, [0, 300], [0, 20]);
  const rotateXContainer = useTransform(scrollY, [0, 300], [0, 5]); // Slight 3D tilt on scroll

  // Animation variants
  const containerVariants = {
    animate: {
      background: [
        `radial-gradient(circle at 20% 20%, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
        `radial-gradient(circle at 80% 80%, ${colors.backgroundEnd}, ${colors.backgroundStart})`,
        `radial-gradient(circle at 20% 20%, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
      ],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 60, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotate: -20, rotateX: 30 },
    visible: { opacity: 1, y: 0, rotate: 0, rotateX: 0 },
    hover: {
      y: -10,
      color: colors.hover,
      scale: 1.15,
      rotateX: 10,
      textShadow: `0 0 10px ${colors.glow}`,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.8, delay: 1.4, ease: "easeOut" },
    },
    hover: {
      scale: 1.15,
      rotateX: 5,
      boxShadow: `0 0 25px ${colors.glow}`,
      transition: { duration: 0.4, yoyo: Infinity },
    },
    tap: { scale: 0.9, rotateX: -5 },
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const titleText = "Latest Arrivals";
  const titleLetters = titleText.split("");

  return (
    <motion.div
      ref={containerRef}
      className="relative flex flex-col sm:flex-row border border-gray-400 overflow-hidden min-h-[70vh]"
      variants={containerVariants}
      animate="animate"
      onMouseMove={handleMouseMove}
      style={{
        perspective: 1000, // Enables 3D transformations
        rotateX: rotateXContainer,
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Enhanced Particle System */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Particle
          key={i}
          x={Math.random() * (window.innerWidth * 0.5)}
          y={Math.random() * (window.innerHeight * 0.7)}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          color={colors.particle}
          index={i}
        />
      ))}

      {/* Left Side - Text Content */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -100, rotateY: -15 },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: { duration: 1.2, ease: "easeOut", delay: 0.3 },
          },
        }}
        className="w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-0 relative z-10"
      >
        <div style={{ color: colors.text }} className="text-center sm:text-left">
          {/* Bestseller Tag */}
          <motion.div
            className="flex items-center gap-4 justify-center sm:justify-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <motion.div
              className="w-10 h-[2px]"
              style={{ backgroundColor: colors.accent }}
              animate={{ width: [10, 30, 10], rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="font-medium text-sm md:text-lg tracking-wider">OUR BESTSELLERS</p>
          </motion.div>

          {/* 3D Animated Title */}
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            style={{ y: parallaxYText, transformPerspective: 1000 }}
            className="prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight mt-4"
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

          {/* 3D Shop Now Button */}
          <motion.div
            className="flex items-center gap-4 mt-6 justify-center sm:justify-start"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.p
              className="font-semibold text-sm md:text-lg cursor-pointer px-6 py-2 bg-gradient-to-r from-transparent to-[rgba(255,87,127,0.2)] rounded-full"
              whileHover={{ color: colors.hover, boxShadow: `0 0 15px ${colors.glow}` }}
            >
              SHOP NOW
            </motion.p>
            <motion.div
              className="w-10 h-[2px]"
              style={{ backgroundColor: colors.accent }}
              animate={{ width: [10, 30, 10], rotate: [0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Hero Image */}
      <motion.img
        src={assets.hero_img}
        alt="Hero"
        initial={{ opacity: 0, x: 100, scale: 0.9, rotateY: 15 }}
        animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.4, delay: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.08,
          rotateY: 5,
          boxShadow: `0 0 30px ${colors.glow}`,
          transition: { duration: 0.5 },
        }}
        style={{ y: parallaxYImage, transformPerspective: 1000 }}
        className="w-full sm:w-1/2 object-cover relative z-10"
      />

      {/* Dynamic 3D Overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, ${colors.backgroundStart}00, ${colors.particle}10, ${colors.backgroundEnd}00)`,
          transformPerspective: 1000,
        }}
        animate={{
          x: [-50, 50, -50],
          rotateY: [-5, 5, -5],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export default Hero;