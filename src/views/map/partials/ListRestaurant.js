import React from 'react'
import {Restaurants} from "../../../config/Restaurant"
import {useParams} from "react-router-dom";
import socketIO from 'socket.io-client';
import {toast, ToastContainer} from "react-toastify";
const socket = socketIO.connect('http://localhost:4000');

export const ListRestaurant = () => {
  const {id} = useParams()
  const name = localStorage.getItem('pseudo')
  const selectRestaurant = (coordinatesRestau) => {
    socket.emit('setRestauPosition', {
      positionRestau: coordinatesRestau,
      nameUser: name,
      idRoom: parseInt(id)
    })
    toast.success('Le restaurant a été sélectionné !')
  }


  return (
    <div className={"list-restaurant"}>
      <h3>Liste des restaurants</h3>
      <ul>
        {Restaurants.map(restaurant => (
          <li key={restaurant.id} onClick={() => selectRestaurant(restaurant.coordinates)}>{restaurant.name}</li>
        ))}
        
      </ul>

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

export default ListRestaurant;