import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react'
import {MapContainer, Marker, Popup, TileLayer, Polyline} from "react-leaflet";
import {Restaurants} from "../../../config/Restaurant"
import {ICON_RESTAU, ICON_DESTINATION, ICON_USER} from '../partials/MarkerIcon'


const MapLeaflet = (room) => {
    const [userPosition, setUserPosition] = React.useState([0,0]);
    const [position, setPosition] = useState(userPosition)
    const blueOptions = {color: "blue"}

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude])
          setPosition([position.coords.latitude, position.coords.longitude])
        })
      }, [room])
    
      //calculer la distance en km entre deux points
      /*const CalculateDistance = () => {
        let dlon = lon2 - lon1
        let dlat = lat2 - lat1
        let a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2
        let c = 2 * atan2( sqrt(a), sqrt(1-a) )
        let d = 6371 * c
        console.log(d)
      }*/
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
        <div className={"mapLeaflet"}>
          <MapContainer className={'map'} center={[48.890011, 2.197020]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              Restaurants.map((restaurant, index) => {
                return (
                  <Marker icon={ICON_RESTAU} key={index} position={[restaurant.coordinates[0], restaurant.coordinates[1]]}>
                    <Popup>
                      {restaurant.name}
                    </Popup>
                  </Marker>
                )
              })
            }
            <DraggableMarker />
            <Polyline pathOptions={blueOptions} positions={[userPosition, [48.892670, 2.237030], position]} />
    
          </MapContainer>
        </div>
      )
}


export default MapLeaflet;