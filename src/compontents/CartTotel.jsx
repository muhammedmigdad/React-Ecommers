import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = ({ cartTotal }) => {
  const { currency } = useContext(ShopContext);

  if (!cartTotal) return null;

  // Destructure with defaults to prevent undefined errors
  const { item_total = 0, delivery = 0, total = 0 } = cartTotal;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col mt-2 gap-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{Number(item_total).toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency}{Number(delivery).toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency}{Number(total).toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;