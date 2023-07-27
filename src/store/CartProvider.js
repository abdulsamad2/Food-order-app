import React, { useReducer } from "react";
import CartContext from "./cart-contenxt";

// Initial state of the cart
const cartInitialState = {
  items: [],
  totalAmount: 0,
};

// Reducer function to manage state updates based on actions
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // Check if the item already exists in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      // Item already exists in the cart, update its amount
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
    } else {
      // Item is not in the cart, add it as a new entry
      updatedItems = [...state.items, action.item];
    }
    // Return updated state with the new item or updated item amount
    return {
      totalAmount: state.totalAmount + action.item.price * action.item.amount,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );
    const existingCartItem = state.items[existingCartItemIndex];

    // Check if the item exists in the cart
    if (existingCartItem) {
      let updatedItems;
      let updatedTotalAmount;

      if (existingCartItem.amount === 1) {
        // If there's only one of this item, remove it from the cart
        updatedItems = state.items.filter((item) => item.id !== action.id);
        updatedTotalAmount = state.totalAmount - existingCartItem.price;
      } else {
        // If there are multiple items, decrease the amount of the specified item by 1
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedTotalAmount = state.totalAmount - existingCartItem.price;
      }

      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  }
  // If the action type doesn't match any known action, return the initial state
  return cartInitialState;
};

const CartProvider = (props) => {
  // Use the reducer hook to manage the cart state and dispatch actions
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);

  // Handler function to add an item to the cart
  const addItemtoCartHandler = (item) => {
    cartDispatch({
      type: "ADD",
      item,
    });
  };

  // Handler function to remove an item from the cart
  const removeItemFromCartHandler = (id) => {
    cartDispatch({
      type: "REMOVE",
      id,
    });
  };

  // Prepare the cart context with necessary data and functions to be consumed by components
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemtoCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  // Provide the cart context to components within this context provider
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
