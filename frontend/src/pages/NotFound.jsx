import React from 'react'
import homeIcon from "../assets/images/homeicon.png";
import { Link } from 'react-router-dom';

export const NotFound = () => {



  return (

    <section className='notFoundContainer'>

      <h1>Page not found!</h1>

      <p>Please go back to 

        <Link className="navbar-brand" to="/">
        <img src={homeIcon} alt="" style={{ maxHeight: '1.7rem' }} />
      </Link> 
      
      </p>
    </section>

  )
}

