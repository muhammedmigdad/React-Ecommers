import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingBag } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';

function calculateDiscount(original, sale) {
  if (!original || !sale || original <= sale) return null;
  return Math.round(((original - sale) / original) * 100);
}

function ProductItem({ id, name, image, price, originalPrice }) {
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
      {/* Wishlist and Cart Icons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
        <button className="bg-white p-2 rounded-full shadow text-gray-700 hover:text-red-500">
          <FaHeart />
        </button>
        <button className="bg-white p-2 rounded-full shadow text-gray-700 hover:text-black">
          <FaShoppingBag />
        </button>
      </div>

      {/* Product Image */}
      <Link to={`/product/${id}`}>
        <img
          src={productImage}
          alt={name}
          className="w-full h-72 object-cover rounded-t-xl transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </Link>

      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-2 left-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-semibold">
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
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              {currency}{originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
