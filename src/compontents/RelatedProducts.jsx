import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import Title from './Title'; // Fixed typo in "components"
import ProductItem from './ProductItem';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  hover: {
    scale: 1.08,
    rotate: 3,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};

function RelatedProducts({ category, subCategory }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    console.log('ShopContext products:', products);
    console.log('Received category:', category, 'Received subCategory:', subCategory);

    if (!products || !Array.isArray(products) || !category) {
      console.log('No valid products or category, setting related to empty array');
      setRelated([]);
      return;
    }

    const filteredProducts = products
      .filter((item) => item.category_id == category) // Using == instead of === for loose comparison
      .filter((item) => !subCategory || item.subCategory == subCategory);

    console.log('Filtered related products:', filteredProducts);
    setRelated(filteredProducts.slice(0, 5));
  }, [products, category, subCategory]);

  return (
    <motion.div
      className="my-24 px-10 bg-black text-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
        variants={containerVariants}
      >
        {Array.isArray(related) && related.length > 0 ? (
          related.map((item) => (
            <motion.div key={item.id} variants={itemVariants} whileHover="hover">
              <ProductItem
                name={item.name}
                id={item.id}
                price={item.sale_price || item.regular_price}
                image={item.mainimage}  // Make sure this matches the exact key in your data
                className="w-full"
              />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No related products found for category: {category || 'unknown'}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default RelatedProducts;