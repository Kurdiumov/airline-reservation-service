import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import backendConnector from "../backendConnector.js";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "./Map.scss";

export default function Map() {
  const [loading, setLoading] = useState(true);
  const [airports, setAirports] = useState([]);

  L.Marker.prototype.options.icon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -45]
  });

  useEffect(() => {
    let isCancelled = false;
    backendConnector.getAirports().then((airports) => {
      if (!isCancelled) {
        setAirports(airports);
        setLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading === true) {
    return (
      <div className="content flightResults">
        <Loader type="Oval" color="#e67e22" />
      </div>
    );
  }

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {airports.map((airport) => {
        return (
          <Marker
            key={airport.code}
            position={[airport.latitude, airport.longitude]}
          >
            <Popup>
              {airport.name} <b>({airport.code})</b>
              <br />
              {airport.city}, {airport.country}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
