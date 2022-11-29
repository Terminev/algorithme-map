import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import { icon } from "leaflet";
import {Restaurants} from "../../config/Restaurant"
const Map = () => {

  console.log(Restaurants)
  const ICON = icon({
    iconUrl: "images/logo.png",
    iconSize: [32, 32],
  })

  console.log("Map");
  return (
    <div >
      <MapContainer className={"section-map-container"} center={[48.890011, 2.197020]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          Restaurants.features.map(restaurant => {
            return (
              <Marker icon={ICON} position={[restaurant.geometry.coordinates[0], restaurant.geometry.coordinates[1]]}>
                <Popup>
                  {restaurant.properties.NAME}
                </Popup>
              </Marker>
            )
          })
        }

      </MapContainer>
    </div>
  );
};

export default Map;
