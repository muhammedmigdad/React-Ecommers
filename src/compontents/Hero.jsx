import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const colors = {
  background: "#0f172a",
  primary: "#6366f1",
  secondary: "#10b981",
  textPrimary: "#f8fafc",
  textSecondary: "#94a3b8",
  accent: "#f59e0b",
  hover: "#ec4899",
};

function Hero() {
  const containerRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const controls = useAnimation();
  const isAnimating = useRef(false);
  
  // Sample images array
  const images = [
    assets.men1,
    assets.p_img37,
    assets.p_img44,
    assets.p_img19,
  ];
  
  // Enhanced image navigation with animation control
  const nextImage = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    await controls.start({
      opacity: 0,
      x: -50,
      transition: { duration: 0.5 }
    });
    
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    
    await controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    });
    
    isAnimating.current = false;
  };
  
  const prevImage = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    await controls.start({
      opacity: 0,
      x: 50,
      transition: { duration: 0.5 }
    });
    
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    
    await controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    });
    
    isAnimating.current = false;
  };
  
  // Auto-rotate images with pause on hover
  useEffect(() => {
    let interval;
    const container = containerRef.current;
    
    const startInterval = () => {
      interval = setInterval(() => {
        nextImage();
      }, 5000);
    };
    
    const pauseInterval = () => {
      clearInterval(interval);
    };
    
    startInterval();
    
    container.addEventListener('mouseenter', pauseInterval);
    container.addEventListener('mouseleave', startInterval);
    
    return () => {
      clearInterval(interval);
      container.removeEventListener('mouseenter', pauseInterval);
      container.removeEventListener('mouseleave', startInterval);
    };
  }, []);
  
  // Advanced 3D effects with WebGL-like particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // Create floating 3D particles
    const createParticles = () => {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full particle';
        
        // Random properties
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 5000 + Math.random() * 10000;
        const color = `hsla(${Math.random() * 60 + 200}, 80%, 70%, ${Math.random() * 0.5 + 0.3})`;
        
        particle.style.cssText = `
        `;
        
        container.appendChild(particle);
        
        // 3D-like animation with depth
        const keyframes = [
          { 
            transform: 'translate3d(0, 0, 0) scale(0.5)', 
            opacity: 0 
          },
          { 
            transform: `translate3d(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px, ${Math.random() * 1000 - 500}px) scale(1)`, 
            opacity: 0.8 
          },
          { 
            transform: 'translate3d(0, 0, 0) scale(0.5)', 
            opacity: 0 
          }
        ];
        
        const options = {
          duration,
          delay: delay * 1000,
          iterations: Infinity,
          easing: 'cubic-bezier(0.5, 0, 0.5, 1)'
        };
        
        particle.animate(keyframes, options);
      }
    };
    
    createParticles();
    
    // Parallax effect with perspective
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth) - 0.5;
      const yPos = (clientY / window.innerHeight) - 0.5;
      
      const heroImage = container.querySelector('.carousel-container');
      const heroText = container.querySelector('.hero-text');
      const particles = container.querySelectorAll('.particle');
      
      // Apply 3D transform to image
      if (heroImage) {
        heroImage.style.transform = `
          perspective(1000px) 
          rotateX(${-yPos * 10}deg) 
          rotateY(${xPos * 10}deg) 
          translateZ(50px)
        `;
      }
      
      // Apply subtle transform to text
      if (heroText) {
        heroText.style.transform = `
          perspective(1000px) 
          rotateX(${-yPos * 3}deg) 
          rotateY(${xPos * 3}deg) 
          translateZ(20px)
        `;
      }
      
      // Move particles for depth effect
      particles.forEach((particle, i) => {
        const depth = (i % 3) * 0.2 + 0.4; // Different depth layers
        particle.style.transform = `
          translate3d(${xPos * 30 * depth}px, ${yPos * 30 * depth}px, 0)
        `;
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      const particles = container.querySelectorAll('.particle');
      particles.forEach(p => p.remove());
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden min-h-[80vh] bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-800/30"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating 3D shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-indigo-500/10 blur-3xl transform rotate-45 scale-150" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-purple-600/10 blur-3xl transform -rotate-12 scale-150" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-lg bg-cyan-400/5 blur-3xl transform rotate-12 scale-150" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row min-h-[80vh]">
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <motion.div 
            className="hero-text text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="flex items-center gap-4 justify-center lg:justify-start mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-indigo-400" />
              <motion.p 
                className="font-medium text-lg tracking-widest text-indigo-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                OUR BESTSELLERS
              </motion.p>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl  font-bold mb-6 text-indigo-600"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Latest Arrivals
            </motion.h1>
            
            <motion.p 
              className="text-lg text-slate-300 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Discover our premium collection with cutting-edge designs and unparalleled quality.
            </motion.p>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <button className="relative overflow-hidden px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 group">
                <span className="relative z-10">SHOP NOW</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute inset-0 rounded-full border-2 border-indigo-400/50 scale-110 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-500"></span>
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Right side - Image Carousel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <motion.div 
            className="carousel-container relative w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* 3D Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-600/30 rounded-2xl transform -rotate-6 scale-105 blur-md" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-2xl transform rotate-3 scale-105 blur-lg" />
            
            {/* Carousel */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.6 }}
                  className="w-full"
                >
                  <img
                    src={images[currentImage]}
                    alt={`Hero ${currentImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation buttons */}
              <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                <motion.button 
                  onClick={prevImage}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-sm pointer-events-auto"
                >
                  &#10094;
                </motion.button>
                <motion.button 
                  onClick={nextImage}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-sm pointer-events-auto"
                >
                  &#10095;
                </motion.button>
              </div>
              
              {/* Dots indicator */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    whileHover={{ scale: 1.2 }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentImage === index 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Advanced 3D effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating 3D elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-indigo-500/5 border border-indigo-400/10"
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-lg bg-purple-600/5 border border-purple-400/10"
          animate={{
            y: [0, -15, 0],
            x: [0, -5, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </div>
  );
}

export default Hero;