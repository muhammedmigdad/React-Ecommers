import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../compontents/Title';
import CartTotal from '../compontents/CartTotel';
import { assets } from '../assets/assets';

const Cart = () => {
  const { cartItems, currency, updateQuantity, navigate } = useContext(ShopContext);

  return (
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
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
                      {item.price}
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
                    item.id,
                    e.target.value === '' ? 0 : Number(e.target.value)
                  )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={0}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item.id, 0)}
                className="w-4 sm:w-5 cursor-pointer hover:opacity-70"
                src={assets.bin_icon}
                alt="Remove"
              />
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
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