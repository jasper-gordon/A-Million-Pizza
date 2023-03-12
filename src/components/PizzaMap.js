import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import reviews from "./pizza_reviews.json";
import Review from "./Review";
import { AlignHorizontalLeft } from "@mui/icons-material";
import LocationMarker from "./LocationMarker";

// Setting the icon image for map markers
function GetIcon(iconSize1) {
  return L.icon({
    iconUrl: require("../assets/Icons/pizza_icon.png"),
    iconSize: iconSize1,
  });
}

export default function PizzaMap() {
  const [spot, changeSpot] = useState("Party woo!");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <p className="map-header"> The Pizza Map</p>
      <div className="map-container">
        <div className="map-search-box">
          {/* Search box that filters restaurants as user types */}
          <input
            className="video-search-input"
            type="text"
            placeholder="Search..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="map-list-box">
          <div className="wide-map">
            <MapContainer
              className="leaflet-container"
              center={[40.758, -73.9855]}
              zoom={14}
              scrollWheelZoom={false}
            >
              {/* <LocationMarker></LocationMarker> */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* <TileLayer
//MAKE SURE TO REMOVE ACCESS TOKEN
attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>'
url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=${RETENTER API KEY}"
/> */}
              {reviews
                .filter((shop) => {
                  if (searchTerm == "") {
                    return shop;
                  } else if (
                    shop.name
                      .toLocaleLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return shop;
                  } else if (
                    shop.city
                      .toLocaleLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return shop;
                  }
                })
                .map((review, i) => (
                  <Marker position={review.position} icon={GetIcon(26)}>
                    <Popup>{review.name}</Popup>
                  </Marker>
                ))}
              {/* <Marker position={[40.758, -73.9855]} icon={GetIcon(20)}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
            </MapContainer>
          </div>
        </div>

        {/* A side menu to list all restuarent Review component cards */}
        <div className="side-list">
          <h2 style={{ alignItem: "center", justifyContent: "center", margin: 0}}>
            {" "}
            Results
          </h2>
          {reviews
          
          .filter((bob) => {
            if (searchTerm == "") {
              return bob;
            } else if (
              bob.name
                .toLocaleLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return bob;
            } else if (
              bob.city
                .toLocaleLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return bob;
            }
          })
          .map((review) => {
            //Mapping over all reviews and making a Review component
            return (
              <Review
                name={review.name}
                city={review.city}
                score={review.score}
                sauce={review.sauce}
                cheese={review.cheese}
                crust={review.crust}
                price={review.price}
              />
            );
          })}
        </div>
      </div>
      {/* <h1>{spot}</h1>
       */}
    </>
  );
}
