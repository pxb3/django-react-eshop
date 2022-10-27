import { useContext } from "react";
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";

const Cart = () => {

  const { user } = useContext(AuthContext);

  const { cart, removeFromCart } = useContext(CartContext);

  const currentUser = user==null ? 'Anonymous' : user.username;

  const cartArr = [];

  cart.map((item) => (
    cartArr.push({"item": item.id})
  ));

  const shop = () => {
    axios.post(`http://localhost:8000/eshop/cart/create/`, {
      user : currentUser,
      cartItems : cartArr
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {})
  };

  return (
    <div className ="container-fluid">
      <h1>Cart</h1>
      {cart[0] != "empty" && cart.map((item) =>
        <div className ="row bg-light">
          <div className ="col-2 mt-2 pt-2">
            <img src= {`/images/${item.img}`} width="50" height="50" alt=""></img>
          </div>
          <div className ="col-5 mt-2 pt-2">
            <p>{item.desc}</p>
          </div>
          <div className ="col-5 mt-2 pt-2">
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>

        </div>
      )}
      <button onClick={shop}>Shop</button>
    </div>
  );
};

export default Cart;
