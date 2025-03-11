/**
 * Review component that displays a card with details about a pizza restaurant.
 * Shows the restaurant name, city, overall score, and individual ratings for
 * crust, cheese, and sauce.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.name - Name of the restaurant
 * @param {string} props.city - City where the restaurant is located
 * @param {number} props.score - Overall rating out of 10
 * @param {number} props.crust - Crust rating out of 10
 * @param {number} props.cheese - Cheese rating out of 10
 * @param {number} props.sauce - Sauce rating out of 10
 * @param {string} props.price - Price category (e.g., "$", "$$", "$$$")
 */

import React from "react";
import PropTypes from "prop-types";

const Review = ({ name, city, score, crust, cheese, sauce, price }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="restaurant-name">{name}</div>
        <div className="restaurant-location">{city}</div>
        <div className="restaurant-score">{score}/10</div>
        <div className="restaurant-price">{price}</div>
      </div>
      <div className="review-details">
        <h3>Crust: <span>{crust}/10</span></h3>
        <h3>Cheese: <span>{cheese}/10</span></h3>
        <h3>Sauce: <span>{sauce}/10</span></h3>
      </div>
    </div>
  );
};

Review.propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  crust: PropTypes.number.isRequired,
  cheese: PropTypes.number.isRequired,
  sauce: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
};

export default Review;