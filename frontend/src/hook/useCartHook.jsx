import { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

export const useCartHook = () => {
  const { cart, setCart,  setCartCount,  setCartTotalPrice } = useGlobalContext();




  /* Update cart count and cart total price when cart items change, and save the updated cart to localStorage */
  useEffect(() => {
    setCartCount(cart.length);
    setTotalPrice()
    localStorage.setItem("localCart", JSON.stringify(cart));
  }, [cart, setCart]);


  /* total price function */
  const setTotalPrice = () => {
    let startPrice = 0;

    cart.forEach(element => {
      startPrice += element.quantity * element.price;
    });
    
    setCartTotalPrice(startPrice);
  }


  // Function to add or update items in the cart
  const addToCart = (item) => {

    // Check if the item already exists in the cart
    const existingInCart = cart.find(cartItem => cartItem._id === item._id);
    let updateCart = [];
    
    // If the item exists, update the quantity; otherwise, add it to the cart
    if (existingInCart) {
      updateCart = cart.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updateCart = [...cart, { ...item, quantity: 1 }];
    }
    
    // Update cart 
    setCart(updateCart);
  };





  /* Remove product from the cart */
  const deleteFromCart = (itemId) => {
    setCart(cart.filter(item => item._id !== itemId));
  };

  
  return { addToCart, deleteFromCart };
};
