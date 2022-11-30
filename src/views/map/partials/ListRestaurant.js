import React from 'react'
import {Restaurants} from "../../../config/Restaurant"

export const ListRestaurant = () => {

  const selectRestaurant = (idRestau, coordinatesRestau) => {

  }


  return (
    <div className={"list-restaurant"}>
      <h3>Liste des restaurants</h3>
      <ul>
        {Restaurants.map(restaurant => (
          <li key={restaurant.id} onClick={selectRestaurant(restaurant.id, restaurant.coordinates)}>{restaurant.name}</li>
        ))}
        
      </ul>
        

    </div>
  )
}

export default ListRestaurant;