import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import backendConnector from "../backendConnector.js";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "./Map.scss";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      airports: []
    };

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -45]
    });
  }

  componentDidMount = async () => {
    this.mounted = true;
    const airports = await backendConnector.getAirports();
    let newState = { ...this.state };
    newState.loading = false;
    newState.airports = airports;
    if (this.mounted) {
      console.log("Setting state");
      this.setState(newState);
    }
  };

  componentWillUnmount = () => {
    this.mounted = false;
    console.log("Unmount");
  };

  render = () => {
    if (this.state.loading === true) {
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
        {this.state.airports.map((airport) => {
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
  };
}

export default Map;
