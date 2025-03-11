/**
 * PizzaMap component that displays an interactive map of pizza restaurants
 * with their reviews and ratings. Features include search functionality
 * and detailed review cards for each location.
 * 
 * @component
 */

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
import reviews from "./pizza_reviews.json";
import Review from "./Review";

/**
 * @typedef {Object} PizzaReview
 * @property {string} name - Restaurant name
 * @property {string} city - Restaurant city
 * @property {number} score - Overall rating out of 10
 * @property {number} sauce - Sauce rating
 * @property {number} cheese - Cheese rating
 * @property {number} crust - Crust rating
 * @property {string} price - Price category
 * @property {[number, number]} position - [latitude, longitude]
 */

/**
 * Creates a custom pizza marker icon
 * @param {number} size - Size of the icon in pixels
 * @returns {L.Icon} Leaflet icon instance
 */
const createPizzaIcon = (size) => {
  return L.icon({
    iconUrl: require("../assets/Icons/pizza_icon.png"),
    iconSize: [size, size],
  });
};

/**
 * Filters pizza reviews based on search term
 * @param {PizzaReview[]} reviews - Array of pizza reviews
 * @param {string} searchTerm - Search term to filter by
 * @returns {PizzaReview[]} Filtered reviews
 */
const filterReviews = (reviews, searchTerm) => {
  if (!searchTerm) return reviews;
  
  const searchLower = searchTerm.toLowerCase();
  return reviews.filter(
    (review) => 
      review.name.toLowerCase().includes(searchLower) ||
      review.city.toLowerCase().includes(searchLower)
  );
};

export default function PizzaMap() {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter reviews based on search term
  const filteredReviews = filterReviews(reviews, searchTerm);

  return (
    <div className="map-container">
      <h1 className="map-header">The Pizza Map</h1>
      
      {/* Search input */}
      <div className="map-search-box">
        <input
          className="video-search-input"
          type="text"
          placeholder="Search restaurants or cities..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search pizza restaurants"
        />
      </div>

      <div className="map-list-box">
        {/* Map display */}
        <div className="wide-map">
          <MapContainer
            className="leaflet-container"
            center={[40.758, -73.9855]}
            zoom={15}
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <ZoomControl position="bottomleft" />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Restaurant markers */}
            {filteredReviews.map((review) => (
              <Marker
                key={review.name}
                position={review.position}
                icon={createPizzaIcon(26)}
                eventHandlers={{
                  click: () => setSelectedMarker(review.name)
                }}
              >
                <Popup>
                  <strong>{review.name}</strong>
                  <br />
                  {review.score}/10, {review.price}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Review cards sidebar */}
        <div className="side-list">
          <h2 style={{ margin: 0, textAlign: 'center' }}>
            {filteredReviews.length} Results
          </h2>
          
          {filteredReviews.map((review) => (
            <Review
              key={review.name}
              name={review.name}
              city={review.city}
              score={review.score}
              sauce={review.sauce}
              cheese={review.cheese}
              crust={review.crust}
              price={review.price}
            />
          ))}
          
          {filteredReviews.length === 0 && (
            <p style={{ textAlign: 'center', padding: '1rem' }}>
              No restaurants found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
