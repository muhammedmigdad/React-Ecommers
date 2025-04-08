import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../compontents/RelatedProducts';
import axios from '../compontents/services/axios';
import ProductReview from '../compontents/ProductReview';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
};

const imageGalleryVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 } },
};

const thumbnailVariants = {
  initial: { opacity: 0.6, scale: 0.9 },
  hover: { opacity: 1, scale: 1.05 },
  active: { opacity: 1, scale: 1 },
};

const productDetailsVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut', delayChildren: 0.2 } },
};

const infoVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const sizeButtonVariants = {
  initial: { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  hover: { scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' },
  active: { scale: 1, backgroundColor: '#ff6b6b' },
  disabled: { opacity: 0.5, cursor: 'not-allowed' },
};

const addToCartVariants = {
  hover: { scale: 1.08, backgroundColor: '#ff4757' },
  tap: { scale: 0.98 },
};

function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setZoom(1);
  };

  const handleMouseMove = (event) => {
    if (isHovering && imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const xPct = (event.clientX - rect.left) / rect.width;
      const yPct = (event.clientY - rect.top) / rect.height;

      setZoom(2); // Adjust zoom level as needed

      imageRef.current.style.transformOrigin = `${xPct * 100}% ${yPct * 100}%`;
    }
  };

  const imageStyle = {
    transform: `scale(${zoom})`,
    transition: 'transform 0.3s ease-out',
    cursor: 'zoom-in',
  };

  useEffect(() => {
    if (!productId || productId === 'undefined') {
      setError('No product ID provided');
      setLoading(false);
      navigate('/');
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product_details/${productId}/`);
        const data = response.data;
        setProductData(data);

        if (data.available_sizes?.length > 0) {
          setAvailableSizes(data.available_sizes);
          setSelectedSize(data.available_sizes[0].size_code);
        }

        const images = [data.mainimage, data.image_1, data.image_2, data.image_3, data.image_4].filter(Boolean);
        setImage(images.length > 0 ? images[0] : '/placeholder.jpg');
      } catch (error) {
        setError(error.response?.data?.error || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  if (loading) return <div className="text-center py-10 text-gray-600">Loading product...</div>;
  if (error || !productData) return <div className="text-center py-10 text-red-500">{error || 'Product not found'}</div>;

  const sizeOptions = {
    s: 'Small',
    xs: 'Extra Small',
    m: 'Medium',
    l: 'Large',
    xl: 'Extra Large',
    xxl: 'Double Extra Large'
  };

  const showSizeSelector = availableSizes.length > 0;
  const normalizedRating = Math.max(0, Math.min(5, productData.average_rating || 0));
  const fullStars = Math.round(normalizedRating);
  const emptyStars = 5 - fullStars;

  return (
    <motion.div
      className="pt-10 pb-16 px-6 bg-black text-white transition-opacity ease-in duration-500 opacity-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <motion.div className="flex flex-col md:flex-row gap-6" variants={imageGalleryVariants}>
          <motion.div className="flex-shrink-0 w-full md:w-32 flex overflow-x-auto md:flex-col md:overflow-y-auto justify-start md:justify-center" variants={imageGalleryVariants}>
            {[productData.mainimage, productData.image_1, productData.image_2, productData.image_3, productData.image_4]
              .filter(Boolean)
              .map((imgSrc, index) => (
                <motion.img
                  key={index}
                  src={imgSrc}
                  alt={`Product thumbnail ${index}`}
                  className={`w-24 h-24 md:w-full md:h-auto object-cover rounded-md cursor-pointer mb-2 md:mb-4 ${image === imgSrc ? 'border-2 border-red-500' : ''}`}
                  onClick={() => setImage(imgSrc)}
                  variants={thumbnailVariants}
                  initial="initial"
                  whileHover="hover"
                  animate={image === imgSrc ? 'active' : 'initial'}
                />
              ))}
          </motion.div>
          <div className="w-full overflow-hidden rounded-lg shadow-md">
            <div
              className="relative w-full h-auto"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <motion.img
                ref={imageRef}
                className="w-full h-full object-contain md:object-cover"
                src={image || '/placeholder.jpg'}
                alt={productData.name}
                style={imageStyle}
              />
            </div>
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div className="py-4 flex flex-col justify-center" variants={productDetailsVariants}>
          <motion.h1 className="text-4xl font-bold mb-4 text-red-500 tracking-tight" variants={infoVariants}>{productData.name}</motion.h1>
          <motion.div className="flex items-center mb-3" variants={infoVariants}>
            <span className="text-yellow-400">{'★'.repeat(fullStars)}</span>
            <span className="text-gray-600">{'★'.repeat(emptyStars)}</span>
            <span className="ml-2 text-gray-400">({normalizedRating.toFixed(1)})</span>
          </motion.div>
          <motion.p className="text-3xl font-semibold mb-5" variants={infoVariants}>{currency}{productData.sale_price || productData.regular_price}</motion.p>
          <motion.p className="text-gray-300 mb-6 leading-relaxed" variants={infoVariants}>{productData.description || 'No description available'}</motion.p>

          {/* Size Selection */}
          {showSizeSelector && (
            <motion.div className="mb-6" variants={infoVariants}>
              <p className="text-lg text-gray-300 mb-3">Select Size:</p>
              <div className="flex flex-wrap gap-3">
                {availableSizes.map((size) => (
                  <motion.button
                    key={size.size_code}
                    onClick={() => setSelectedSize(size.size_code)}
                    className={`py-2 px-4 rounded-md text-gray-200 border border-gray-500 ${
                      selectedSize === size.size_code ? 'bg-red-500 border-red-500' : ''
                    }`}
                    disabled={!size.in_stock}
                    variants={sizeButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    animate={selectedSize === size.size_code ? 'active' : 'initial'}
                    whileTap="tap"
                  >
                    {size.size_code.toUpperCase()}
                  </motion.button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-sm text-gray-400 mt-2">Selected: {sizeOptions[selectedSize.toLowerCase()]}</p>
              )}
            </motion.div>
          )}

          {/* Stock Information */}
          <motion.p className="mb-4 text-sm text-gray-400" variants={infoVariants}>
            {availableSizes.find(s => s.size_code === selectedSize)?.stock_quantity > 0
              ? `Availability: In Stock (${availableSizes.find(s => s.size_code === selectedSize)?.stock_quantity} available)`
              : 'Availability: Out of Stock'}
          </motion.p>

          {/* Add to Cart Button */}
          <motion.button
            onClick={() => {
              if (showSizeSelector && !selectedSize) {
                alert('Please select a size');
                return;
              }
              const selectedSizeData = availableSizes.find(s => s.size_code === selectedSize);
              if (!selectedSizeData || selectedSizeData.stock_quantity <= 0) {
                alert('This size is out of stock');
                return;
              }
              addToCart(productData.id, selectedSize);
              alert('Added to cart!');
            }}
            className="bg-gray-600 text-white py-3 px-8 text-sm rounded-md focus:outline-none disabled:bg-gray-700 disabled:cursor-not-allowed"
            disabled={!availableSizes.find(s => s.size_code === selectedSize)?.stock_quantity}
            variants={addToCartVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {availableSizes.find(s => s.size_code === selectedSize)?.stock_quantity > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
          </motion.button>
        </motion.div>
      </div>

      {/* Product Review Section */}
      <div className="mt-16">
        <ProductReview productId={productId} />
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <RelatedProducts category={productData.category} />
      </div>
    </motion.div>
  );
}

export default Product;