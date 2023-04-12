import AppContext from "../../context";
import React from "react";

export const useCart = () => {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce(
    (sum, obj) => sum + parseInt(obj.price),
    0
  );

  return {
    cartItems,
    setCartItems,
    totalPrice,
  };
};
