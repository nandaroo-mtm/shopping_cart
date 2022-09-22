import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const local = localStorage.getItem("cartItems");

const initialState = {
  cartItems: local ? JSON.parse(local) : [],
  cartTotalQty: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cartsSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQty += 1;
        toast.info(`increased ${state.cartItems[itemIndex].title} quantity`, {
          position: "bottom-left",
        });
      } else {
        const tempProduct = { ...action.payload, cartQty: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${tempProduct.title} is added to cart!`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = newCartItems;
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      toast.error(`${action.payload.title} is removed from cart!`, {
        position: "bottom-left",
      });
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQty > 1) {
        state.cartItems[itemIndex].cartQty -= 1;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        toast.info(`Decreased ${state.cartItems[itemIndex].title} quantity`, {
          position: "bottom-left",
        });
      } else if(state.cartItems[itemIndex].cartQty === 1) {
        const newCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItems;
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        toast.error(`${action.payload.title} is removed cart!`, {
          position: "bottom-left",
        });
      }
    },
    clearCart : (state,action) => {
      state.cartItems = []
      localStorage.clear();
      toast.error('Cart cleared', {
        position: "bottom-left",
      });
    },
    getTotals:(state,action) => {
      const {total,quantity}=state.cartItems.reduce((cartTotal, item) => {
        const {price,cartQty} =item;
        cartTotal.total +=cartQty * price;
        cartTotal.quantity += cartQty;
        return cartTotal
      },{
        total: 0,
        quantity :0
      } );
      state.cartTotalAmount =total;
      state.cartTotalQty = quantity;
    }
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, decreaseQuantity, clearCart, getTotals } = cartSlice.actions;
