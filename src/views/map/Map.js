import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import { icon } from "leaflet";
import {Restaurants} from "../../config/Restaurant"
const Map = () => {

  const [userPosition, setUserPosition] = React.useState([0,0]);
  const [draggableMarkerPosition, setDraggableMarkerPosition] = React.useState();
  const ICON = icon({
    iconUrl: "images/logo.png",
    iconSize: [32, 32],
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserPosition([position.coords.latitude, position.coords.longitude])
    })

    setDraggableMarkerPosition(userPosition)
  }, [])


  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={draggableMarkerPosition}
        ref={markerRef}>
        <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
        </Popup>
      </Marker>
    )
  }

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
        <DraggableMarker />

      </MapContainer>
    </div>
  );
};

export default Map;
