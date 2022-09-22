import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
  getTotals,
} from "../features/cartSlice";
import img1 from "../images/product_1.png";
import img2 from "../images/product_2.png";
import img3 from "../images/product_3.png";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals())
  },[cart,dispatch]);

  const handleRemoveBtn = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty!</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="titles">
            <h3 className="title">Name</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-product">
                  <img
                    src={item.id === 1 ? img1 : item.id === 2 ? img2 : img3}
                    alt={item.title}
                  />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <button onClick={() => handleRemoveBtn(item)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${item.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => dispatch(decreaseQuantity(item))}>
                    -
                  </button>
                  <div className="count">{item.cartQty}</div>
                  <button onClick={() => dispatch(addToCart(item))}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${item.price * item.cartQty}
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <button
                className="cart-clear"
                onClick={() => dispatch(clearCart())}
              >
                Clear cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">${cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <button>Checkout</button>
                <div className="continue-shopping">
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
