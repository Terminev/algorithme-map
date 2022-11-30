import React from 'react'
import {Restaurants} from "../../../config/Restaurant"
import {useParams} from "react-router-dom";

export const ListRestaurant = () => {
  const {id} = useParams()
  const selectRestaurant = (idRestau, coordinatesRestau) => {
    console.log(idRestau, coordinatesRestau)
  }


  return (
    <div className={"list-restaurant"}>
      <h3>Liste des restaurants</h3>
      <ul>
        {Restaurants.map(restaurant => (
          <li key={restaurant.id} onClick={() => selectRestaurant(restaurant.id, restaurant.coordinates)}>{restaurant.name}</li>
        ))}
        
      </ul>
        

    </div>
  )
}

export default ListRestaurant;