import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useSpring, useTransform, useViewportScroll, useMotionValue } from "framer-motion";
import { assets } from "../assets/assets";

// Enhanced color palette with richer gradients
const colors = {
  backgroundStart: "#0d0d21",
  backgroundEnd: "#1e2a44",
  particlePrimary: "#ff577f",
  particleSecondary: "#00d4ff",
  particleGlow: "#ff577f80",
  textPrimary: "#f5f5f5",
  textSecondary: "#b0c4de",
  accent: "#00d4ff",
  hover: "#ffaa4c",
  glowPrimary: "#00d4ff80",
  glowSecondary: "#ff577f40",
  lightOverlay: "#ffffff15",
};

// Advanced Particle component with dynamic behavior
const Particle = ({ x, y, mouseX, mouseY, color, index, size = 4 }) => {
  const springX = useSpring(x, { stiffness: 300, damping: 40 });
  const springY = useSpring(y, { stiffness: 300, damping: 40 });
  const springZ = useSpring(0, { stiffness: 200, damping: 30 });
  const rotateX = useTransform(springY, [0, window.innerHeight], [-20, 20]);
  const rotateY = useTransform(springX, [0, window.innerWidth], [-20, 20]);
  const scale = useSpring(1, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const dx = mouseX.get() - springX.get();
    const dy = mouseY.get() - springY.get();
    const distance = Math.sqrt(dx * dx + dy * dy);
    const repelFactor = Math.min(0.8, 300 / (distance + 1));
    if (distance < 300) {
      springX.set(x - dx * repelFactor);
      springY.set(y - dy * repelFactor);
      springZ.set(Math.cos(index + Date.now() * 0.002) * 50);
      scale.set(1.8 - distance / 300);
    } else {
      springX.set(x);
      springY.set(y);
      springZ.set(Math.sin(index) * 10);
      scale.set(1);
    }
  }, [mouseX, mouseY, x, y, springX, springY, springZ, scale, index]);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        x: springX,
        y: springY,
        z: springZ,
        width: size,
        height: size,
        backgroundColor: color,
        rotateX,
        rotateY,
        scale,
        transformPerspective: 2000,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 2, 0],
        rotate: [0, 180, 360],
        boxShadow: [
          `0 0 8px ${colors.glowPrimary}`,
          `0 0 20px ${colors.glowSecondary}`,
          `0 0 8px ${colors.glowPrimary}`,
        ],
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        delay: index * 0.1,
      }}
    />
  );
};

// New 3D Grid Overlay component
const GridOverlay = ({ mouseX, mouseY }) => {
  const gridX = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);
  const gridY = useTransform(mouseY, [0, window.innerHeight], [-10, 10]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `linear-gradient(0deg, ${colors.lightOverlay} 1px, transparent 1px), linear-gradient(90deg, ${colors.lightOverlay} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        rotateX: gridY,
        rotateY: gridX,
        transformPerspective: 2500,
      }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

function Hero() {
  const controls = useAnimation();
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useViewportScroll();
  const parallaxYText = useTransform(scrollY, [0, 400], [0, -60]);
  const parallaxYImage = useTransform(scrollY, [0, 400], [0, 50]);
  const rotateXContainer = useTransform(scrollY, [0, 400], [0, 12]);
  const rotateYContainer = useTransform(mouseX, [0, window.innerWidth], [-8, 8]);
  const glowOpacity = useTransform(scrollY, [0, 400], [0.3, 0.8]);

  // Animation variants
  const containerVariants = {
    animate: {
      background: [
        `radial-gradient(circle at 20% 20%, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
        `radial-gradient(circle at 80% 80%, ${colors.backgroundEnd}, ${colors.backgroundStart})`,
        `radial-gradient(circle at 20% 20%, ${colors.backgroundStart}, ${colors.backgroundEnd})`,
      ],
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 100, rotateX: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.8,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 80, rotate: -45, rotateX: 60 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0, 
      rotateX: 0, 
      transition: { duration: 1, ease: "easeOut" } 
    },
    hover: {
      y: -20,
      color: colors.hover,
      scale: 1.3,
      rotateX: 20,
      rotateY: 15,
      textShadow: `0 0 20px ${colors.glowPrimary}, 0 0 40px ${colors.glowSecondary}`,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.6, rotateX: -45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: { duration: 1.2, delay: 1.8, ease: "easeOut" },
    },
    hover: {
      scale: 1.25,
      rotateX: 15,
      rotateY: 10,
      boxShadow: `0 0 40px ${colors.glowPrimary}, 0 0 60px ${colors.glowSecondary}`,
      transition: { duration: 0.6, yoyo: Infinity },
    },
    tap: { scale: 0.9, rotateX: -15 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 150, scale: 0.8, rotateY: 30 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: { duration: 2, delay: 1.2, ease: "easeOut" },
    },
    hover: {
      scale: 1.15,
      rotateY: 12,
      rotateX: 8,
      boxShadow: `0 0 50px ${colors.glowPrimary}, 0 0 80px ${colors.glowSecondary}`,
      transition: { duration: 0.8 },
    },
  };

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const titleText = "Latest Arrivals";
  const titleLetters = titleText.split("");

  return (
    <motion.div
      ref={containerRef}
      className="relative flex flex-col sm:flex-row border border-gray-400 overflow-hidden min-h-[80vh]"
      variants={containerVariants}
      animate="animate"
      onMouseMove={handleMouseMove}
      style={{
        perspective: 2000,
        rotateX: rotateXContainer,
        rotateY: rotateYContainer,
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Enhanced Particle System with Multiple Colors */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Particle
          key={i}
          x={Math.random() * (window.innerWidth * 0.5)}
          y={Math.random() * (window.innerHeight * 0.8)}
          mouseX={mouseX}
          mouseY={mouseY}
          color={i % 2 === 0 ? colors.particlePrimary : colors.particleSecondary}
          index={i}
          size={Math.random() * 6 + 2}
        />
      ))}

      {/* 3D Grid Overlay */}
      <GridOverlay mouseX={mouseX} mouseY={mouseY} />

      {/* Left Side - Text Content */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -150, rotateY: -30 },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            transition: { duration: 1.6, ease: "easeOut", delay: 0.6 },
          },
        }}
        className="w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-0 relative z-10"
      >
        <div style={{ color: colors.textPrimary }} className="text-center sm:text-left">
          <motion.div
            className="flex items-center gap-4 justify-center sm:justify-start"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div
              className="w-16 h-[2px]"
              style={{ backgroundColor: colors.accent }}
              animate={{ 
                width: [16, 50, 16], 
                rotate: [0, 30, 0],
                boxShadow: `0 0 15px ${colors.glowPrimary}` 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="font-medium text-sm md:text-lg tracking-widest" style={{ color: colors.textSecondary }}>
              OUR BESTSELLERS
            </p>
          </motion.div>

          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            style={{ y: parallaxYText, transformPerspective: 2000 }}
            className="prata-regular text-4xl sm:text-5xl lg:text-7xl leading-tight mt-4"
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

          <motion.div
            className="flex items-center gap-4 mt-6 justify-center sm:justify-start"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
          >
            <motion.p
              className="font-semibold text-sm md:text-lg cursor-pointer px-8 py-3 bg-gradient-to-r from-transparent to-[rgba(0,212,255,0.3)] rounded-full border border-[rgba(0,212,255,0.5)]"
              whileHover={{ 
                color: colors.hover, 
                boxShadow: `0 0 25px ${colors.glowPrimary}, 0 0 50px ${colors.glowSecondary}` 
              }}
              style={{ transformPerspective: 1500 }}
            >
              SHOP NOW
            </motion.p>
            <motion.div
              className="w-16 h-[2px]"
              style={{ backgroundColor: colors.accent }}
              animate={{ 
                width: [16, 50, 16], 
                rotate: [0, -30, 0],
                boxShadow: `0 0 15px ${colors.glowPrimary}` 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Hero Image */}
      <motion.img
        src={assets.hero_img}
        alt="Hero"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        style={{ y: parallaxYImage, transformPerspective: 2000 }}
        className="w-full sm:w-1/2 object-cover relative z-10"
      />

      {/* Dynamic 3D Lighting Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, ${colors.lightOverlay}, transparent 70%)`,
          transformPerspective: 2500,
        }}
        animate={{
          opacity: glowOpacity,
          rotateY: [-10, 10, -10],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Enhanced Ambient Glow Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(45deg, ${colors.backgroundStart}00, ${colors.glowPrimary}30, ${colors.glowSecondary}20, ${colors.backgroundEnd}00)`,
          transformPerspective: 2500,
        }}
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          rotateY: [-15, 15, -15],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

export default Hero;