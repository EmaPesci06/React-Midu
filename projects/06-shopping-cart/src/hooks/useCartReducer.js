import { useReducer } from "react";
import { cartInitialState, cartReducer } from "../reducers/cart";

export function useCardReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: product });

  const clearCart = () => dispatch({ type: "CLEAN_CART" });

  return { state, addToCart, removeFromCart, clearCart };
}
