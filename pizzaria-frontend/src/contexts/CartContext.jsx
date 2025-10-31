import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.name === newItem.name);
      if (existingIndex !== -1) {
        return prevCart.map((item, index) => 
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const updateQuantity = (index, amount) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const item = updatedCart[index];
      if (!item) return prevCart;

      const newQuantity = item.quantity + amount;
      if (newQuantity <= 0) {
        updatedCart.splice(index, 1);
      } else {
        updatedCart[index] = { ...item, quantity: newQuantity };
      }
      return updatedCart;
    });
  };

  const clearCart = () => setCart([]);

  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart, // ← se ainda quiseres usar diretamente
        cartItems: cart, // ← agora sim!
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,        // ← adicionado
        getTotalPrice,    // ← adicionado
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
