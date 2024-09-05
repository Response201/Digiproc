import React from 'react';
import { RatingComponent } from './RatingComponent';
import { useCartHook } from '../hook/useCartHook';

export const Card = ({ element }) => {
  const { addToCart } = useCartHook();




  return (
    <article className="cardItem">
      <section className="imagePriceContainer">
        <img src={element.image} alt={element.name} />
                {/* Display price in SEK with two decimal places */}
                <p>{element.price.toString().slice('0', '2')} {element.price.toString().slice('2')} SEK</p>
      </section>
      <section className="cardContent">
   
        <h1 style={{ color: element.primaryColor }}>{element.name}</h1>

        {/* Rating-component */}
        <RatingComponent inRating={element.rating} id={element._id} />

        <button
          className='addToCartBtn'
          style={{ backgroundColor: element.primaryColor }}
          onClick={() => addToCart(element)}
        >
          ADD TO CART
        </button>
      </section>
    </article>
  );
};
