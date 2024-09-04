import React from 'react'
import { RatingComponent } from './RatingComponent'

export const Card = ({element}) => {
  return (
    <article key={element._id} className="cardItem">
              <section className="imagePriceContainer">
                <img src={element.image} alt={element.name} />
                {/* Display price in SEK with two decimal places */}
                <p>{element.price.toString().slice('0', '2')} {element.price.toString().slice('2')} SEK</p>
              </section>
<secttion className="cardContent">
 {/* dynamic color from element.primaryColor */} 
<h1 style={{color:element.primaryColor}}> {element.name} </h1>
  
{/* Rating-component */}
<RatingComponent rating={element.rating} />

 {/* dynamic color from element.primaryColor */} 
<button className='addToCartBtn' style={{backgroundColor:element.primaryColor}}>

ADD TO CART
</button>


</secttion>

            </article>
  )
}
 
