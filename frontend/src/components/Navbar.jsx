import React, { useState, useEffect } from 'react';
import homeIcon from "../assets/images/homeicon.png";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


export const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([
    { id: 1, product: 'Saving & Cost avoidance', quantity: 1,  price:90000  },
    { id: 2, product: 'Code of Conduct', quantity: 1, price:90000 },
    { id: 3, product: 'ESG measurement', quantity: 1, price:90000 },
  ]);


/*  Update cart count and cart total price when cart items change */
  useEffect(() => {
    setCartCount(cartItems.length);
    let startPrice = 0;
    cartItems.forEach(element => {
      startPrice += element.quantity * element.price
    });
    setCartTotalPrice(startPrice)

  }, [cartItems]);

  // Function to handle removing an item from the cart
  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <nav className="navbar navbar-expand-lg  " >
      <div className="container-fluid" style={{ padding: "0" }} >
        <Link className="navbar-brand" to="/">
          <img src={homeIcon} alt="" style={{ maxHeight: '1.7rem' }} />
        </Link>
        <div className="d-flex ms-auto">
          <Dropdown>
            <Dropdown.Toggle  id="cartDropdown" className='navText'>
              <FontAwesomeIcon icon={faShoppingCart} className='navText' />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end" >
              {cartCount === 0 ? (
                <Dropdown.Item>Your cart is empty</Dropdown.Item>
              ) : (
                <>
                  {cartItems.map(item => (
                    <Dropdown.Item key={item.id} className="d-flex justify-content-between align-items-center">
                      <span>  {item.product} ({item.quantity}) </span>
                      <Button
                        variant="link"
                        onClick={() => handleRemoveItem(item.id)}
                        className="binIcon p-0">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </Dropdown.Item>
                  ))}
                       <Dropdown.Item className="d-flex justify-content-end align-items-center"><p> Total:</p> <p> {cartTotalPrice} kr </p> </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/checkOut" className='text-center checkout'>Check out</Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};
