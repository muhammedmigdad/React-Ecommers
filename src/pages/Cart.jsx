import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../compontents/Title'; // Fixed typo
import CartTotal from '../compontents/CartTotel'; // Fixed typo
import { assets } from '../assets/assets';
import axios from '../compontents/services/axios'; // Assuming you have an axios instance

const Cart = () => {
  const { cartItems, currency, updateQuantity, navigate, cartTotal } = useContext(ShopContext);
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details for each item in the cart
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const productIds = Object.keys(cartItems);
        if (productIds.length === 0) {
          setCartDetails([]);
          setLoading(false);
          return;
        }

        // Fetch details for all products in the cart
        const productPromises = productIds.map(productId =>
          axios.get(`/product_details/${productId}/`)
        );
        const responses = await Promise.all(productPromises);
        const productsData = responses.map(response => response.data);

        // Map cart items to include detailed product info
        const detailedItems = Object.entries(cartItems).flatMap(([productId, sizes]) => {
          const product = productsData.find(p => p.id === productId) || {
            id: productId,
            name: 'Unknown Product',
            mainimage: '/placeholder.jpg',
            sale_price: 0,
            regular_price: 0
          };

          return Object.entries(sizes).map(([size, quantity]) => ({
            id: `${productId}-${size}`,
            product: {
              id: productId,
              name: product.name,
              mainimage: product.mainimage,
            },
            size,
            quantity,
            price: product.sale_price || product.regular_price || 0 // Use sale_price if available
          }));
        });

        setCartDetails(detailedItems);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load cart details');
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, [cartItems]); // Re-run when cartItems changes

  if (loading) {
    return (
      <div className="border-t pt-14">
        <div className="mb-3 text-2xl">
          <Title text1={'YOUR'} text2={'CART'} />
        </div>
        <p className="text-gray-500 text-center py-10">Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t pt-14">
        <div className="mb-3 text-2xl">
          <Title text1={'YOUR'} text2={'CART'} />
        </div>
        <p className="text-red-500 text-center py-10">{error}</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartDetails.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Your cart is empty</p>
        ) : (
          cartDetails.map((item) => (
            <div
              key={item.id}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 items-center"
            >
              <div className="flex items-start gap-6">
                <img
                  src={item.product.mainimage || '/placeholder.jpg'}
                  className="w-16 sm:w-20"
                  alt={item.product.name}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {item.product.name}
                  </p>
                  <div className="flex items-center mt-2 gap-5">
                    <p>
                      {currency}
                      {item.price.toFixed(2)} {/* Ensure price is formatted */}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  updateQuantity(
                    item.product.id,
                    item.size,
                    e.target.value === '' ? 0 : Number(e.target.value)
                  )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={0}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item.product.id, item.size, 0)}
                className="w-4 sm:w-5 cursor-pointer hover:opacity-70"
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          ))
        )}
      </div>

      {cartDetails.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal cartTotal={cartTotal} /> {/* Use cartTotal from ShopContext */}
            <div className="w-full text-end">
              <button
                onClick={() => navigate('/placeorder')}
                className="bg-black text-white rounded-md text-sm my-8 px-8 py-3 hover:bg-gray-800"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;