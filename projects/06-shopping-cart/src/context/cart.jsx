import { createContext } from "react";
import { useCardReducer } from "../hooks/useCartReducer";
export const CartContext = createContext();

export function CartProvider({ children }) {
  const { clearCart, addToCart, state, removeFromCart } = useCardReducer();
  return (
    <CartContext.Provider
      value={{ cart: state, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
