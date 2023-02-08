import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function GetIcon(iconSize1) {
  return L.icon({
    iconUrl: require("../assets/Icons/pizza_icon.png"),
    iconSize: iconSize1,
  });
}

export default function PizzaMap() {
  const locations = [
    { name: "Upside Pizza", position: [40.7216, -73.9954] },
    { name: "Joe's Pizza", position: [40.7332732, -73.9876565]},
  ];

  return (
    <div>
      <MapContainer
        className="leaflet-container"
        center={[40.758, -73.9855]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
{/* <TileLayer
//MAKE SURE TO REMOVE ACCESS TOKEN
attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>'
url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=${RETENTER API KEY}"
/> */}
        {locations.map((location, i) => (
          <Marker position={location.position} icon={GetIcon(20)}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
        {/* <Marker position={[40.758, -73.9855]} icon={GetIcon(20)}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker> */}
      </MapContainer>
    </div>
  );
}
