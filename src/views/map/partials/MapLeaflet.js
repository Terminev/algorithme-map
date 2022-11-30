import React, {useEffect, useState, useRef, useMemo} from 'react'
import {MapContainer, Marker, Popup, TileLayer, Polyline} from "react-leaflet";
import {Restaurants} from "../../../config/Restaurant"
import {ICON_RESTAU, ICON_DESTINATION, ICON_USER} from '../partials/MarkerIcon'


const MapLeaflet = (room) => {
  const [userPosition, setUserPosition] = React.useState([0, 0]);
  const [position, setPosition] = useState([48.890011, 2.197020])
  const blueOptions = {color: "blue"}
  const [users, setUsers] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserPosition([position.coords.latitude, position.coords.longitude])
      setPosition([position.coords.latitude, position.coords.longitude])
    })

    if (room.room.length > 0) {
      setUsers(room.room[0]["users"])
    }

  }, [room])

  const DraggableMarker = () => {

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
            localStorage.setItem("appointmentPosition", position);
            console.log(position)
          }
        },
      }),
      [],
    )

    return (
      <Marker
        icon={ICON_DESTINATION}
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
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
        <DraggableMarker/>

        {
          users.map((user, index) => {
            return (
              <Polyline key={index} pathOptions={blueOptions} positions={user.positionRestau != null ? [user.positionUser, user.positionRestau, position] : [user.positionUser, position]}/>
            )
          })
        }

      </MapContainer>
    </div>
  )
}


export default MapLeaflet;