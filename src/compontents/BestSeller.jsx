import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5)); // Display only top 5 best sellers
  }, [products]);

  return (
    <div className='my-10'>
      {/* Title Section */}
      <motion.div 
        className='text-center text-3xl py-8'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false }} // Animates every time it enters the viewport
      >
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, quo quas. Voluptas earum a hic!
        </p>
      </motion.div>

      {/* Products Grid with Scroll Animation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 50 }} // Hides when scrolling back up
            transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
            viewport={{ once: false }} // Runs every time on scroll
          >
            <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
