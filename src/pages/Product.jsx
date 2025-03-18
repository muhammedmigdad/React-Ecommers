import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../compontents/RelatedProducts';
import axios from '../compontents/services/axios';

function Product() {
  const { productId } = useParams();
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setError("No product ID provided");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product_details/${productId}/`);
        const data = response.data;
        setProductData(data);

        // Handle images
        const images = [data.mainimage, data.image_1, data.image_2, data.image_3, data.image_4].filter(Boolean);
        setImage(images.length > 0 ? images[0] : "/placeholder.jpg");
      } catch (error) {
        setError(error.response?.data?.error || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center py-10 text-gray-600">Loading product...</div>;
  if (error || !productData) return <div className="text-center py-10 text-red-500">{error || "Product not found."}</div>;

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
            <img className="w-full h-auto" src={image || "/placeholder.jpg"} alt={productData.name} />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.sale_price || productData.regular_price}</p>
          <p className="mt-2 text-gray-500 md:w-4/5">{productData.description || "No description available"}</p>

          {/* Size Selection */}
          <div className="flex flex-col my-8 gap-4">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.size ? (
                <button
                  onClick={() => setSelectedSize(productData.size)}
                  className={`border py-2 px-4 bg-gray-100 ${selectedSize === productData.size ? "border-orange-500" : ""}`}
                >
                  {productData.size}
                </button>
              ) : (
                <p className="text-gray-500">No size available</p>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              if (productData.size && !selectedSize) {
                alert("Please select a size");
                return;
              }
              addToCart(productData.id, selectedSize);
              setSelectedSize('');
            }}
            className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700 rounded-lg"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} />
    </div>
  );
}

export default Product;