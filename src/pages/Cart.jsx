import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../compontents/Title";
import CartTotal from "../compontents/CartTotel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../compontents/services/axios";

const Cart = () => {
  const { cartItems, updateQuantity, setCartItems, setCartTotal, cartTotal: contextCartTotal } = useContext(ShopContext);
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No access token found");

      const response = await axiosInstance.get("/cart/");
      const { cart_items, cart_total } = response.data;

      const detailedItems = cart_items.map((item) => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name || "Unknown",
          mainimage: item.product.mainimage || "/placeholder.jpg",
        },
        size: item.size,
        quantity: item.quantity,
        price: item.price,
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

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, size, value) => {
    const numValue = value === "" ? 0 : Number(value);
    if (numValue < 0) return;

    const cartItem = cartDetails.find((item) => item.product.id === productId && item.size === size);
    if (!cartItem) return;

    const prevQuantity = cartItem.quantity;
    updateQuantity(productId, size, numValue);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No access token found");

      if (numValue === 0) {
        await axiosInstance.delete(`/cart/remove/${cartItem.id}/`);
        setCartDetails(cartDetails.filter((item) => item.id !== cartItem.id));
        toast.success("Item removed from cart");
      } else {
        await axiosInstance.put(`/cart/update/${cartItem.id}/`, { quantity: numValue });
        setCartDetails(cartDetails.map((item) => (item.id === cartItem.id ? { ...item, quantity: numValue } : item)));
        toast.success("Cart updated");
      }

      const response = await axiosInstance.get("/cart/");
      setCartTotal(response.data.cart_total);
    } catch (err) {
      updateQuantity(productId, size, prevQuantity);
      toast.error(err.response?.data?.error || "Failed to update cart");
    }
  };

  if (loading) {
    return (
      <div className="border-t pt-14">
        <Title text1="YOUR" text2="CART" />
        <p className="text-center text-gray-500 py-10">Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t pt-14">
        <Title text1="YOUR" text2="CART" />
        <p className="text-center text-red-500 py-10">{error}</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <Title text1="YOUR" text2="CART" />
      <div>
        {cartDetails.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Your cart is empty</p>
        ) : (
          cartDetails.map((item) => (
            <div key={item.id} className="border-b py-4 grid grid-cols-[4fr_1fr_1fr] items-center gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.product.mainimage}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                </div>
              </div>
              <input
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.product.id, item.size, e.target.value)}
                className="border rounded text-center w-16"
              />
              <p>{item.price}</p>
            </div>
          ))
        )}
      </div>

      {cartDetails.length > 0 && (
        <div className="mt-10">
          <CartTotal cartTotal={contextCartTotal} />
          <div className="flex justify-end mt-4">
            <button
              onClick={() => navigate("/placeorder")}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
