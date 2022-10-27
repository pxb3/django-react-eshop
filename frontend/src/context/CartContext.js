import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export default CartContext;

export const CartProvider = ({children}) => {

  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(JSON.parse(window.sessionStorage.getItem("cart")));
  }, []);

  useEffect(() => {

    if (JSON.parse(window.sessionStorage.getItem("cart")) == null){
      window.sessionStorage.setItem("cart", JSON.stringify(["empty"]));
    }
    else {
      if (cart.length > 0) {
        window.sessionStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }, [cart]);

  const addToCart = (itemId, desc, img) => {
    if (cart[0] === "empty"){
      setCart([{"id" : itemId, "desc": desc, "img": img}])
    }
    else{
      setCart( current => {
        return [...current, {"id" : itemId, "desc": desc, "img": img}]
      });
    }

  };

  const removeFromCart = itemId => {
    if (cart.length == 1){
      setCart(["empty"])
      return;
    }
    setCart( current => {
      return current.filter(item => {
        return item.id != itemId;
      });
    });
  };

  const contextDatas = {
    cart,
    setCart,
    addToCart,
    removeFromCart
  };

  return (
    <CartContext.Provider value={contextDatas}>
      { children }
    </CartContext.Provider>
  );
};