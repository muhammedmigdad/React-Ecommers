import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem'; // Assuming you have this component

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.5 } }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.2 }
  }
};

function RelatedProducts({ category, subCategory }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    console.log('Fetching related products...');
    console.log('ShopContext products:', products);
    console.log('Received category:', category, 'Received subCategory:', subCategory);

    if (!products || !Array.isArray(products) || !category) {
      console.warn('No valid products or category provided.');
      setRelated([]);
      setIsLoading(false);
      return;
    }

    const filteredProducts = products
      .filter((item) => item.category_id == category)
      .filter((item) => !subCategory || item.subCategory == subCategory);

    console.log('Filtered related products:', filteredProducts);

    // Simulate a delay for loading state (remove in a real API integration)
    setTimeout(() => {
      setRelated(filteredProducts.slice(0, 5));
      setIsLoading(false);
      if (filteredProducts.length === 0) {
        setError('No related products found in this category.');
      }
    }, 500);
  }, [products, category, subCategory]);

  return (
    <motion.section
      className="py-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Title text1="Explore Similar" text2="Items" />
          <p className="text-gray-600 mt-2">Discover other products you might like.</p>
        </div>
        {isLoading ? (
          <div className="text-center text-gray-500">Loading related products...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            variants={containerVariants}
          >
            {related.map((item) => (
              <motion.div key={item.id} variants={cardVariants} whileHover={{ scale: 1 }}> {/* Removed normal scale */}
                <ProductItem
                  id={item.id}
                  name={item.name}
                  price={item.sale_price || item.regular_price}
                  image={item.mainimage}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

export default RelatedProducts;