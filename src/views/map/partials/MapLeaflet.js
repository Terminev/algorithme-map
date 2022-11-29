import React from 'react'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Restaurants} from "../../../config/Restaurant"
import MarkerIcon from '../partials/MarkerIcon'


const MapLeaflet = () => (
    <MapContainer className={"section-map-container"} center={[48.890011, 2.197020]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
        Restaurants.features.map(restaurant => {
            return (
            <Marker icon={MarkerIcon} position={[restaurant.geometry.coordinates[0], restaurant.geometry.coordinates[1]]}>
                <Popup>
                {restaurant.properties.NAME}
                </Popup>
            </Marker>
            )
            })
        }

    </MapContainer>
)

export default MapLeaflet;