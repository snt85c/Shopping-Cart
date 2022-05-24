import React, { useState, createContext } from "react";

const CartContext = createContext({
    display: "none",
    items: [],
    isCheckoutClicked: false,
    close: () => {},
});

export const CartContextProvider = (props) => {
  let [cart, setCart] = useState({
    display: "none",
    items: [],
    isCheckoutClicked: false,
  });

  const closeDisplay = () => {
    console.log("close dis");
    setCart({ ...cart, display: cart.display === "none" ? "block" : "none" });
  }

  return (
    <CartContext.Provider
      value={{
        display: cart.display,
        items: cart.items,
        isCheckoutClicked: cart.isCheckoutClicked,
        close: closeDisplay,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
