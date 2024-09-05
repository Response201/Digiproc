import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { useFetch } from '../hook/useFetch';


export const RatingComponent = ({ id, inRating }) => {  
  /* State to keep track of the currently hovered star, rating-value, url, body */
  const [hoveredStar, setHoveredStar] = useState(null);
  const [rating, setRating] = useState(inRating);
  const [body, setBody] = useState({});
  const [url, setUrl] = useState("");

  useFetch(url, "PUT", body);

  /* Function to update the hovered star, when mouse is over a star */
  const handleMouseOver = (i) => {
    let newRatings = i + 1;
    setHoveredStar(newRatings);
  };

  /* Function to reset the star display to the original rating when mouse leaves */
  const handleMouseOut = () => {
    
      setHoveredStar(null);

  };

  /* Function to handle star click events to update the rating, sets body and url to fetch new rating value */
  const handleMouseClick = async (i) => {
    let newRatings = i + 1;
    setRating(newRatings);
    setBody({ "id": `${id}`, "newRating": newRatings });
    setUrl("http://localhost:27017/updateRating");
  };

  /* Generate an array of star elements */
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        /* Determine which star icon to display based on the rating or hovered state */
        icon={i < (hoveredStar ?? rating) ? faStarSolid : faStarRegular}
        className="star"
        /* Attach event handlers for mouse and click events */
        onMouseOver={() => handleMouseOver(i)}
        onMouseOut={handleMouseOut}
        onClick={() => handleMouseClick(i)}
      />
    );
  }

  return (
    <section className="ratingContainer">
      <p>Ratings</p>
      <div className="stars">
        {stars}
      </div>
    </section>
  );
};
