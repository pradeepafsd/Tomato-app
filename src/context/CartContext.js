import { createContext, useState } from "react";

// Create a global context for Cart
export const CartContext = createContext();

// Provider component to wrap app and provide cart state
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // store all cart items
  
  // Store address globally, can be edited from CartScreen
  const [address, setAddress] = useState("12, North Street, Chennai, TN - 612001");

  // Add item to cart, increment if exists
  const addToCart = (item, quantity) => {
    const existing = cartItems.find((i) => i.id === item.id);
    if (existing) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity }]);
    }
  };

  // Remove item from cart by ID
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((i) => i.id !== id));
  };

  // Increase item quantity
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  // Decrease item quantity (minimum 1)
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : 1 } : i
      )
    );
  };

  // Clear cart after order is placed
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        address,
        setAddress, // allows inline editing in CartScreen
      }}
    >
      {children} {/* wrap the app to provide cart state */}
    </CartContext.Provider>
  );
};