import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import { icon } from "leaflet";
import {Restaurants} from "../../config/Restaurant"
const Map = () => {

  const [userPosition, setUserPosition] = React.useState([0,0]);
  const [position, setPosition] = useState(userPosition)
  const blueOptions = { color: 'blue' }
  const ICON = icon({
    iconUrl: "images/rond-bleu.webp",
    iconSize: [25, 25],
  })

  const ICON_DESTINATION = icon({
    iconUrl: "images/rond-rouge.png",
    iconSize: [35, 35],
  })
  const ICON_USER = icon({
    iconUrl: "images/rond-rouge.png",
    iconSize: [35, 35],
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserPosition([position.coords.latitude, position.coords.longitude])
      setPosition([position.coords.latitude, position.coords.longitude])
    })

  }, [])

  //calculer la distance en km entre deux points
  /*const CalculateDistance = () => {
    let dlon = lon2 - lon1
    let dlat = lat2 - lat1
    let a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2
    let c = 2 * atan2( sqrt(a), sqrt(1-a) )
    let d = 6371 * c
    console.log(d)
  }*/

  //Tracer la route entre deux points
  const TracePath = () => {


    const polyline = [
      [51.505, -0.09],
      [51.51, -0.1],
      [51.51, -0.12],
    ]
  }


  const DraggableMarker = () => {
    const [draggable, setDraggable] = useState(false)

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
            console.log(position)
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
        icon={ICON_DESTINATION}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Le marker est déplaçable'
            : 'Cliquez pour déplacer le marker'}
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
          Restaurants.features.map((restaurant, index) => {
            return (
              <Marker icon={ICON} key={index} position={[restaurant.geometry.coordinates[0], restaurant.geometry.coordinates[1]]}>
                <Popup>
                  {restaurant.properties.NAME}
                </Popup>
              </Marker>
            )
          })
        }
        <DraggableMarker />
        <Polyline pathOptions={blueOptions} positions={[userPosition, [48.892670, 2.237030], position]} />

      </MapContainer>
    </div>
  );
};

export default Map;
