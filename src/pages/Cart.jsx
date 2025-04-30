import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../compontents/Title";
import CartTotal from "../compontents/CartTotel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../compontents/services/axios";

const Cart = () => {
  const { setCartTotal, cartTotal: contextCartTotal } = useContext(ShopContext);
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await axiosInstance.get("/cart/");
      const { cart_items, cart_total } = response.data;

      const detailedItems = cart_items.map((item) => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name,
          mainimage: item.product.mainimage,
          price: item.product.price
        },
        size: item.size,
        quantity: item.quantity,
        price: item.price
      }));

      setCartDetails(detailedItems);
      setCartTotal(cart_total);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load cart");
      toast.error(err.response?.data?.error || "Error loading cart");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await axiosInstance.delete(`/cart/remove/${itemId}/`);
        setCartDetails(cartDetails.filter(item => item.id !== itemId));
        toast.success("Item removed from cart");
      } else {
        await axiosInstance.put(`/cart/update/${itemId}/`, { quantity: newQuantity });
        setCartDetails(cartDetails.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
        toast.success("Cart updated");
      }

      const response = await axiosInstance.get("/cart/");
      setCartTotal(response.data.cart_total);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update cart");
    }
  };

  useEffect(() => { fetchCart(); }, []);

  if (loading) return (
    <div className="border-t pt-14">
      <Title text1="YOUR" text2="CART" />
      <p className="text-center text-gray-500 py-10">Loading cart...</p>
    </div>
  );

  if (error) return (
    <div className="border-t pt-14">
      <Title text1="YOUR" text2="CART" />
      <p className="text-center text-red-500 py-10">{error}</p>
    </div>
  );

  return (
    <div className="border-t pt-14">
      <Title text1="YOUR" text2="CART" />
      
      {cartDetails.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartDetails.map((item) => (
              <div key={item.id} className="border-b py-4 grid grid-cols-12 items-center gap-4">
                <div className="col-span-6 flex items-center gap-4">
                  <img
                    src={item.product.mainimage}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                  </div>
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                    className="border rounded text-center w-16"
                  />
                </div>
                <div className="col-span-3 text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <CartTotal cartTotal={contextCartTotal} />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => navigate("/checkout")}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;