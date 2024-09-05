import React, { createContext, useState, useContext } from 'react';

// Create the context with a default value (null in this case)
export const GlobalContext = createContext(null);

// GlobalProvider component
export const GlobalProvider = ({ children }) => {
   
  const getInitialCart = () => {
    const savedCart = localStorage.getItem("localCart");
    try {
      // Attempt to parse JSON
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      // If an error occurs during parsing, log it and return an empty array
      return [];
    }
  };
  
  // State for cart, cart count, and cart total price
  const [cart, setCart] = useState(getInitialCart); 
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  return (
    <GlobalContext.Provider value={{ cart, setCart, cartCount, setCartCount, cartTotalPrice, setCartTotalPrice }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
