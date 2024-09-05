import React, { useState, useEffect } from 'react';
import homeIcon from "../assets/images/homeicon.png";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useGlobalContext } from '../context/GlobalContext';
import { useCartHook } from '../hook/useCartHook';



export const Navbar = () => {

  const { deleteFromCart } = useCartHook();
  const { cart,  cartCount,  cartTotalPrice } = useGlobalContext();


  return (
    <nav className="navbar navbar-expand-lg  " >
      <div className="container-fluid" style={{ padding: "0" }} >
        <Link className="navbar-brand" to="/">
          <img src={homeIcon} alt="" style={{ maxHeight: '1.7rem' }} />
        </Link>
        <div className="d-flex ms-auto">
          <Dropdown>
            <Dropdown.Toggle id="cartDropdown" className='navText'>
              <FontAwesomeIcon icon={faShoppingCart} className='navText' />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end" >

              {/*  Checks if cart is empty or not */}
              {cartCount === 0 ? (
                <Dropdown.Item>Your cart is empty</Dropdown.Item>
              ) : (
                <>
                  {cart.map(item => (
                    <Dropdown.Item key={item._id} className="d-flex justify-content-between align-items-center">
                      <span>  {item.name} ({item.quantity}) </span>

                       {/*  delete product from cart */}
                      <Button
                        variant="link"
                        onClick={() => deleteFromCart(item._id)}
                        className="binIcon p-0">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item className="d-flex justify-content-end align-items-center"><p> Total:</p> <p> {cartTotalPrice} kr </p> </Dropdown.Item>
                  <Dropdown.Divider />
                  
                    {/*  check out btn */}
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
