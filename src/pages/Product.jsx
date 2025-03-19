import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../compontents/RelatedProducts';
import axios from '../compontents/services/axios';

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
        console.log('Fetched product data:', data);
        setProductData(data);

        // Set available sizes
        if (data.available_sizes && data.available_sizes.length > 0) {
          setAvailableSizes(data.available_sizes);
          setSelectedSize(data.available_sizes[0].size_code); // Default to first size
        }

        const images = [data.mainimage, data.image_1, data.image_2, data.image_3, data.image_4].filter(Boolean);
        setImage(images.length > 0 ? images[0] : '/placeholder.jpg');
      } catch (error) {
        setError(error.response?.data?.error || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  if (loading) return <div className="text-center py-10 text-gray-600">Loading product...</div>;
  if (error || !productData) return <div className="text-center py-10 text-red-500">{error || 'Product not found.'}</div>;

  const sizeOptions = {
    s: 'Small',
    xs: 'Extra Small',
    m: 'Medium',
    l: 'Large',
    xl: 'Extra Large',
    xxl: 'Double Extra Large'
  };

  const showSizeSelector = availableSizes.length > 0;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Image Gallery */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {[productData.mainimage, productData.image_1, productData.image_2, productData.image_3, productData.image_4]
              .filter(Boolean)
              .map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`Product thumbnail ${index}`}
                  className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${image === imgSrc ? 'border-2 border-orange-500' : ''}`}
                  onClick={() => setImage(imgSrc)}
                />
              ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image || '/placeholder.jpg'} alt={productData.name} />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.sale_price || productData.regular_price}</p>
          <p className="mt-2 text-gray-500 md:w-4/5">{productData.description || 'No description available'}</p>

          {/* Size Selection */}
          {showSizeSelector && (
            <div className="flex flex-col my-8 gap-4">
              <p>Select Size</p>
              <div className="flex gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size.size_code}
                    onClick={() => setSelectedSize(size.size_code)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      selectedSize === size.size_code ? 'border-orange-500' : ''
                    }`}
                    disabled={!size.in_stock}
                  >
                    {size.size_code.toUpperCase()}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-sm text-gray-600">Selected: {sizeOptions[selectedSize.toLowerCase()]}</p>
              )}
            </div>
          )}

          {/* Stock Information */}
          <p className="mb-4 text-sm">
            {availableSizes.find(s => s.size_code === selectedSize)?.stock_quantity > 0 
              ? `In Stock (${availableSizes.find(s => s.size_code === selectedSize)?.stock_quantity} available)`
              : 'Out of Stock'}
          </p>

          {/* Add to Cart Button */}
          <button
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
              alert('Product added to cart!');
            }}
            className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700 rounded-lg"
            disabled={!availableSizes.find(s => s.size_code === selectedSize)?.stock_quantity}
          >
            {availableSizes.find(s => s.size_code === selectedSize)?.stock_quantity > 0 ? 'ADD TO CART' : 'OUT OF STOCK'}
          </button>
        </div>
      </div>

      <RelatedProducts category={productData.category} />
    </div>
  );
}

export default Product;