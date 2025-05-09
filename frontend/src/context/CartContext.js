import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add Service to Cart
  const addToCart = (service) => {
    setCart((prevCart) => [...prevCart, service]);
  };

  // Remove Service from Cart
  const removeFromCart = (serviceId) => {
    setCart((prevCart) => prevCart.filter(service => service.id !== serviceId));
  };

  // Clear Cart (For future use, e.g., after payment)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use CartContext easily
export const useCart = () => useContext(CartContext);
