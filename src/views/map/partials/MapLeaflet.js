import React, {useEffect, useMemo, useRef, useState} from 'react'
import {MapContainer, Marker, Polyline, Popup, TileLayer} from "react-leaflet";
import {Restaurants} from "../../../config/Restaurant"
import {ICON_DESTINATION, ICON_RESTAU, ICON_USER, colorPolyline} from '../partials/MarkerIcon'
import socketIO from 'socket.io-client';
import {useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const socket = socketIO.connect('http://localhost:4000');


const MapLeaflet = (room) => {
  const [userPosition, setUserPosition] = React.useState([0, 0]);
  const [position, setPosition] = useState([48.890011, 2.197020])
  const {id} = useParams()
  const [users, setUsers] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserPosition([position.coords.latitude, position.coords.longitude])
    })

    if (room.room.length > 0) {
      setUsers(room.room[0]["users"])
      if(room.room[0].appointment != null){

        setPosition(room.room[0].appointment)
      }else{
        setPosition([48.890011, 2.197020])
      }
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
            localStorage.setItem("appointmentPosition", [marker.getLatLng().lat, marker.getLatLng().lng]);
            socket.emit('setAppointment', {
              idRoom: parseInt(id),
              appointment: [marker.getLatLng().lat, marker.getLatLng().lng]
            })
            toast.success('La position a bien été enregistrée !')
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
          users.map((user, index) => {
            return (
                <>
                  <Marker
                      icon={ICON_USER}
                      position={[user.positionUser[0], user.positionUser[1]]}
                  >
                    <Popup>
                      {user.name}
                    </Popup>
                  </Marker>

                  {
                    user.positionRestau != null ? (
                      <Marker icon={ICON_RESTAU} key={index} position={[user.positionRestau[0], user.positionRestau[1]]}>
                        <Popup>
                          test
                        </Popup>
                      </Marker>
                    ) :
                      null
                  }

                  <Polyline key={index} pathOptions={colorPolyline(index)} positions={user.positionRestau != null ? [user.positionUser, user.positionRestau, position] : [user.positionUser, position]}/>


                </>
            )
          })
        }
        <DraggableMarker/>

      </MapContainer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}


export default MapLeaflet;