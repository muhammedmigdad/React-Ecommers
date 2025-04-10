// src/components/ProductItem.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function calculateDiscount(original, sale) {
  if (!original || !sale || original <= sale) return null;
  return Math.round(((original - sale) / original) * 100);
}

function ProductItem({ id, name, image, price, originalPrice, onAddToCart, onToggleWishlist }) {
  const { currency } = useContext(ShopContext);
  const baseUrl = "http://127.0.0.1:8000";
  const productImage =
    image && typeof image === 'string'
      ? (image.startsWith('http') ? image : `${baseUrl}${image}`)
      : '/fallback-image.jpg';

  const discount = calculateDiscount(originalPrice, price);
  const brand = name?.split(' ')[0] || 'BRAND';
  const productName = name?.slice(brand.length + 1) || 'Product Title';

  return (
    <div className="relative bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 group">
      {/* Product Image */}
      <Link to={`/product/${id}`}>
        <img
          src={productImage}
          alt={name}
          className="w-full h-72 object-cover rounded-t-xl transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </Link>

      {/* Discount Badge - Top Right */}
      {discount && (
        <div className="absolute top-2 right-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-semibold">
          {discount}% OFF
        </div>
      )}

      {/* Product Details */}
      <div className="p-4 text-left">
        <h3 className="text-sm text-gray-700 font-bold uppercase">{brand}</h3>
        <p className="text-sm text-gray-600">{productName}</p>
        <div className="mt-2">
          <span className="text-lg font-semibold text-gray-900">
            {currency}{price}
          </span>
          {originalPrice && originalPrice !== price && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {currency}{originalPrice}
            </span>
          )}
        </div>

        {/* Buttons - Add to Cart (Left) and Like (Right) */}
        <div className="flex justify-between mt-2 gap-2">
          <button
            onClick={onAddToCart}
            className="bg-blue-600 px-3 py-2 rounded-xl text-white text-sm hover:bg-blue-700 transition-colors"
          >
            Add To Cart
          </button>
          <button
            onClick={onToggleWishlist}
            className="text-gray-700 hover:text-red-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;