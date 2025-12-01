import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react";

const CartContext = createContext();
const STORAGE_KEY = "zonta_cart_v1";

const initialState = {
  items: {}, // { [productId]: { product, qty } }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    // basic validation
    if (parsed && typeof parsed === "object" && parsed.items) return parsed;
    return initialState;
  } catch (e) {
    return initialState;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty = 1 } = action.payload;
      const prev = state.items[product.id] || { product, qty: 0 };
      const nextQty = Math.min(prev.qty + qty, product.stock ?? Infinity);
      return { ...state, items: { ...state.items, [product.id]: { product, qty: nextQty } } };
    }
    case "REMOVE": {
      const id = action.payload.id;
      const newItems = { ...state.items };
      delete newItems[id];
      return { ...state, items: newItems };
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      if (qty <= 0) {
        const newItems = { ...state.items };
        delete newItems[id];
        return { ...state, items: newItems };
      }
      const item = state.items[id];
      if (!item) return state;
      const safeQty = Math.min(qty, item.product.stock ?? Infinity);
      return { ...state, items: { ...state.items, [id]: { ...item, qty: safeQty } } };
    }
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => {
    // lazy initializer reads from localStorage
    if (typeof window === "undefined") return initialState;
    return loadState();
  });

  // persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // ignore storage errors
    }
  }, [state]);

  const addToCart = (product, qty = 1) => dispatch({ type: "ADD", payload: { product, qty } });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: { id } });
  const setQty = (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const summary = useMemo(() => {
    const items = Object.values(state.items);
    const totalItems = items.reduce((s, it) => s + it.qty, 0);
    const subtotal = items.reduce((s, it) => s + it.qty * (Number(it.product.price) || 0), 0);
    return { items, totalItems, subtotal };
  }, [state.items]);

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, setQty, clearCart, summary }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
